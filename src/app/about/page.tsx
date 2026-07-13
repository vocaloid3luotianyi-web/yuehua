import type { Metadata } from "next";

import { AboutArticle } from "@/components/AboutArticle";

import { getAboutPreamble, getAboutSections } from "@/lib/article";



export const metadata: Metadata = {

  title: "愿逐月华",
  description: "关于符月华纪念站的意义与使命",

};



export default function AboutPage() {

  const sections = getAboutSections();

  const preamble = getAboutPreamble();



  return <AboutArticle preamble={preamble} sections={sections} />;

}

