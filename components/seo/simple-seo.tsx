import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import urlJoin from "url-join";

export function SimpleSeo({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const { asPath } = useRouter();
  const url = urlJoin(process.env.NEXT_PUBLIC_VERCEL_URL || "", asPath);

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        site_name: "aCAN Competition",
        url,
      }}
    />
  );
}
