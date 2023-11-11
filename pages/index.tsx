import { useRef, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ReactFullpage from "@fullpage/react-fullpage";

import Navbar from "@/components/Navbar";
import MoveToTopButton from "@/components/move-to-top-button";
import TopSection from "@/sections/top-section";
import PresentationSection from "@/sections/presentation-section";
import GuideSection from "@/sections/guide-section";
import ActivitySection from "@/sections/activity-section";
import FAQSection from "@/sections/faq-section";
import FooterSection from "@/sections/footer-section";
import {
  IActivitySectionData,
  IFaqSectionData,
  IFooterSectionData,
  IGuideSectionData,
  ILangueData,
  IPartenaireSectionData,
  IPresentationSectionData,
  ITopSectionData,
} from "@/types";
import fetcher from "@/utils/fetcher";
import DetailDialogProvider from "@/providers/DetailDialogProvider";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  topSectionData,
  presentationSectionData,
  guideSectionData,
  activitySectionData,
  faqSectionData,
  partenaireSectionData,
  footerSectionData,
  langueData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const moveToRef = useRef<any>();

  return (
    <>
      <Head>
        <title>GRAND PRIX INTERNATIONAL DU CHEF DE L&apos;ETAT POUR LE RÉCITAL DU SAINT CORAN</title>
        <meta name="description" content="INTERNATIONAL GRAND PRIZE OF THE HEAD OF STATE FOR THE RECITATION OF THE HOLY QURAN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailDialogProvider>
        <main className={`${inter.className}`}>
          <Navbar
            langueData={langueData}
            sectionIndex={sectionIndex}
            moveToRef={moveToRef}
          />

          {sectionIndex !== 0 && (
            <MoveToTopButton
              handleClick={() => {
                if (moveToRef.current) {
                  moveToRef.current(1);
                }
              }}
            />
          )}
          <ReactFullpage
            credits={{}}
            beforeLeave={(origin, destination, direction, trigger) => {
              setSectionIndex(destination.index);
            }}
            render={({ state, fullpageApi }) => {
              // @ts-ignore
              if (fullpageApi) {
                moveToRef.current = fullpageApi.moveTo;
              }
              return (
                <ReactFullpage.Wrapper>
                  <TopSection sectionData={topSectionData} />

                  <PresentationSection sectionData={presentationSectionData} />

                  <GuideSection sectionData={guideSectionData} />

                  <ActivitySection sectionData={activitySectionData} />

                  <FAQSection sectionData={faqSectionData} />

                  <FooterSection
                    sectionIndex={sectionIndex}
                    moveToRef={moveToRef}
                    sectionData={partenaireSectionData}
                    footerData={footerSectionData}
                  />
                </ReactFullpage.Wrapper>
              );
            }}
          />
        </main>
      </DetailDialogProvider>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) {
    locale = "fr";
  }
  // const topSectionData = await fetcher<{ result: ITopSectionData[] }>(
  //   `/actualites/alaune?langue=${locale}`
  // );
  const topSectionData = await fetcher<{ result: ITopSectionData[] }>(
    `/competitions?langue=${locale}`
  );
  const langueData = await fetcher<ILangueData>("/languages?langue=" + locale);
  const presentationSectionData = await fetcher<IPresentationSectionData>(
    `/pages/presentation?langue=${locale}`
  );
  const guideSectionData = await fetcher<IGuideSectionData>(
    `/pages/guide?langue=${locale}`
  );
  const activitySectionData = await fetcher<IActivitySectionData>(
    `/actualites?langue=${locale}`
  );
  const faqSectionData = await fetcher<IFaqSectionData>(
    `/pages/faq?langue=${locale}`
  );

  const partenaireSectionData = await fetcher<IPartenaireSectionData>(
    `/pages/partenaire?langue=${locale}`
  );
  const footerSectionData = await fetcher<IFooterSectionData>(
    `/pages/footer?langue=${locale}`
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      topSectionData:
        topSectionData.result.length > 0 ? topSectionData.result[0] : null,
      presentationSectionData: presentationSectionData,
      guideSectionData: guideSectionData,
      activitySectionData: activitySectionData,
      faqSectionData: faqSectionData,
      partenaireSectionData: partenaireSectionData,
      footerSectionData: footerSectionData,
      langueData: langueData,
    }, // will be passed to the page component as props
    revalidate: 60, // seconds
  };
}
