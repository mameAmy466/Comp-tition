import {
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import parse from "html-react-parser";

import fetcher from "@/utils/fetcher";
import { IArticleDetail } from "@/types";
import QualityImage from "@/components/QualityImage";
import { BaseSeo } from "@/components/seo";
import { SimpleSeo } from "@/components/seo/simple-seo";

export default function DetailPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {!!data && <SimpleSeo title={data?.title} />}
      <Container maxWidth="xl" sx={{ py: { xs: 8, sm: 10 } }}>
        {!!data && (
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            {!!data.image && (
              <Grid xs={12} sm={6}>
                <Box>
                  <QualityImage src={data.image} alt={data.title} />
                  <Typography sx={{ mt: 2 }}>
                    Publié par
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {" "}
                      {data.title}
                    </Typography>
                  </Typography>
                  <Typography>
                    Date de publication{" "}
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {data.publish_at}
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid xs={12} {...(!!data.image ? { sm: 6 } : {})}>
              {!data.image && (
                <>
                  <Typography sx={{ mt: 2 }}>
                    Publié par
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {" "}
                      {data.title}
                    </Typography>
                  </Typography>
                  <Typography>
                    Date de publication{" "}
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {data.publish_at}
                    </Typography>
                  </Typography>
                </>
              )}
              {parse(data.content)}
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string[] }>
) {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }
  const [page, slug] = context.params.slug;
  const data = await fetcher<{ result: IArticleDetail }>(
    page === "guide"
      ? `/pages/details/guide/${slug}`
      : `/actualites/details/${slug}`
  );
  return {
    props: { data: data.result },
  };
  // return {
  //   notFound: true,
  // };
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
