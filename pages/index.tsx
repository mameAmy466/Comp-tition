import Head from "next/head";
import { Inter } from "next/font/google";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HomeLanding from "@/components/home/HomeLanding";
import DetailDialogProvider from "@/providers/DetailDialogProvider";
import { API_HEAD_URL } from "@/constants";
import {
  IActivitySectionData,
  ILangueData,
} from "@/types";

const inter = Inter({ subsets: ["latin"] });

const EMPTY_ACTIVITIES: IActivitySectionData = { result: [] };
const EMPTY_LANGS: ILangueData = { result: [] };

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_HEAD_URL}${path}`);
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export default function Home({
  langueData,
  activitySectionData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Concours de récital de Coran SENICO — Édition 2026</title>
        <meta
          name="description"
          content="8e édition du Grand Prix SENICO de récital du Coran. Inscriptions, catégories, calendrier et prix."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailDialogProvider>
        <main className={inter.className}>
          <HomeLanding langueData={langueData} activities={activitySectionData} />
        </main>
      </DetailDialogProvider>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const lang = locale || "fr";
  const [langueData, activitySectionData] = await Promise.all([
    safeFetch<ILangueData>(`/languages?langue=${lang}`, EMPTY_LANGS),
    safeFetch<IActivitySectionData>(`/actualites?langue=${lang}`, EMPTY_ACTIVITIES),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(lang, ["common"])),
      langueData,
      activitySectionData,
    },
    revalidate: 60,
  };
}
