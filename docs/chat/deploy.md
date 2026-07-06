# User:

当前项目如何托管在互联网，并部署在我在cf买好的域名中？

# Auto:

你的项目是 **Next.js 15 静态内容站**：文章从 `res/article/` 读取，在构建时生成 HTML，没有 API、没有服务端动态逻辑。这种形态非常适合 **Cloudflare Pages + 你在 CF 买的域名**，成本低、部署也简单。

---

## 推荐方案：GitHub + Cloudflare Pages + 自定义域名

整体流程：

```mermaid
flowchart LR
    A[本地代码] --> B[推送到 GitHub]
    B --> C[Cloudflare Pages 自动构建]
    C --> D[*.pages.dev 预览]
    D --> E[绑定你的 CF 域名]
    E --> F[https://你的域名]
```

---

## 第一步：把代码放到 Git 托管

当前项目还没有 Git 仓库，需要先初始化并推到 GitHub（或 GitLab）。

```bash
cd c:\Codes\CursorLib\Yuehua
git init
git add .
git commit -m "Initial commit"
```

在 GitHub 新建仓库后：

```bash
git remote add origin https://github.com/你的用户名/yuehua.git
git branch -M main
git push -u origin main
```

---

## 第二步：配置静态导出（推荐）

你的站点全是构建期内容，用 **静态导出** 最省事，也最适合 Cloudflare Pages。

在 `next.config.ts` 中增加：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 静态导出时 next/image 需要此项
  },
};

export default nextConfig;
```

本地验证：

```bash
npm run build
```

成功后会生成 `out/` 目录，里面就是可直接托管的静态文件。

---

## 第三步：在 Cloudflare Pages 创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左侧进入 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 授权并选择你的 GitHub 仓库
4. 构建设置：

| 配置项 | 值 |
|--------|-----|
| Framework preset | Next.js（或 None） |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | 20 或 22（在 Environment variables 里设 `NODE_VERSION=20`） |

5. 点击 **Save and Deploy**

几分钟后会得到类似 `yuehua.pages.dev` 的地址，可先访问确认。

---

## 第四步：绑定你在 CF 买的域名

域名如果在 **同一个 Cloudflare 账号** 下，绑定会自动配 DNS：

1. Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入域名，例如：
   - `example.com`（根域名）
   - `www.example.com`（子域名）
3. Cloudflare 会自动添加 CNAME / 相关 DNS 记录
4. HTTPS 证书会自动签发，一般几分钟内生效

### 常见域名配置

| 访问方式 | 建议 DNS |
|----------|----------|
| `www.example.com` | CNAME → `yuehua.pages.dev` |
| `example.com`（根域名） | Cloudflare 通常自动处理；也可在 Pages 里同时添加根域和 www |

如果希望 `example.com` 自动跳到 `www.example.com`，可在 **Rules → Redirect Rules** 里加一条重定向。

---

## 后续更新

每次 `git push` 到 `main`，Cloudflare Pages 会自动重新构建并发布，无需手动上传。

---

## 备选方案（了解即可）

| 方案 | 适用场景 | 说明 |
|------|----------|------|
| **静态导出 + Pages**（推荐） | 当前这种纯内容站 | 最简单、免费额度够用 |
| **OpenNext (@opennextjs/cloudflare)** | 需要 SSR、API Routes | 配置更复杂，你目前用不上 |
| **Vercel + CF DNS** | 想用 Vercel 托管 | 在 CF 里把域名 CNAME 指到 Vercel |
| **Workers 直接上传 `out/`** | 不想用 Git | `npx wrangler pages deploy out` |

---

## 部署前检查清单

- [ ] `res/article/`、`res/reports/`、`public/images/` 等资源已提交到 Git
- [ ] 本地 `npm run build` 成功，`out/` 可正常预览（可用 `npx serve out`）
- [ ] Cloudflare Pages 构建日志无报错
- [ ] 自定义域名 DNS 状态为 Active
- [ ] 浏览器能打开 `https://你的域名`

---

## 小结

对你这个项目，最顺的路径是：

1. 代码推到 **GitHub**
2. `next.config.ts` 开启 **`output: "export"`**
3. **Cloudflare Pages** 连仓库，输出目录填 **`out`**
4. 在 Pages 里绑定你在 CF 买的域名

如果你愿意，我可以下一步直接帮你改 `next.config.ts`、写好 Pages 构建配置，或整理一份可复制的部署文档放进项目里。你的域名是根域（`example.com`）还是子域（`www.example.com`）？可以说一下，我可以把 DNS 部分写得更具体。