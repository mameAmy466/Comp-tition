import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import urlJoin from "url-join";
import { SeoMetaImage, SeoMetaItem } from "@/types";

interface BaseSeoProps {
  seoData: SeoMetaItem[];
  pageTitle?: string;
}

type SeoObject = Record<string, string>;

export function BaseSeo({ seoData, pageTitle = "" }: BaseSeoProps) {
  let logoData: SeoMetaImage | null = null;
  const seoObject: SeoObject = {};

  seoData.forEach((item) => {
    if (item.label !== "logo") {
      seoObject[item.label] = item.value;
    } else {
      if (item.image) {
        logoData = item.image;
      }
    }
  });
  seoObject["siteTitle"] = seoObject["title"];

  const { asPath } = useRouter();
  const url = urlJoin(process.env.NEXT_PUBLIC_VERCEL_URL || "", asPath);
  if (pageTitle !== "") {
    seoObject["title"] = `${pageTitle} | ${seoObject["title"]}`;
  }

  return (
    <NextSeo
      title={seoObject["title"]}
      description={seoObject["description"]}
      openGraph={{
        title: seoObject["title"],
        description: seoObject["description"],
        images: logoData
          ? [
              {
                url: (logoData as SeoMetaImage).full_url,
                alt: (logoData as SeoMetaImage).file_name,
                width: (logoData as SeoMetaImage).width,
                height: (logoData as SeoMetaImage).height,
              },
            ]
          : [],
        site_name: seoObject["siteTitle"],
        url,
      }}
    />
  );
}
