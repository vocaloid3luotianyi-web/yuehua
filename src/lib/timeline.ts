export type TimelineNode = {
  id: string;
  year: string;
  label: string;
  match: string;
};

export const storyTimeline: TimelineNode[] = [
  { id: "chapter-0", year: "2002", label: "诞生", match: "序章" },
  { id: "chapter-1", year: "2002–2014", label: "童年", match: "第一章" },
  { id: "chapter-2", year: "2014–2017", label: "绽放", match: "第二章" },
  { id: "chapter-3", year: "2017–2019", label: "阴霾", match: "第三章" },
  { id: "chapter-4", year: "2019–2020", label: "撕裂", match: "第四章" },
  { id: "chapter-5", year: "2020–2021", label: "重启", match: "第五章" },
  { id: "chapter-6", year: "2021–2023", label: "华师大", match: "第六章" },
  { id: "chapter-7", year: "2023–2024", label: "抗争", match: "第七章" },
  { id: "chapter-8", year: "2025.1", label: "月光", match: "第八章" },
  { id: "chapter-9", year: "2025.2", label: "归家", match: "第九章" },
];
