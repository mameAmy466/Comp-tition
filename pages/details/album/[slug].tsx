import {
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import { SwiperSlide } from "swiper/react";

import fetcher from "@/utils/fetcher";
import { IAlbumDetail } from "@/types";
import QualityImage from "@/components/QualityImage";
import CustomSwiper from "@/components/swiper";
import { SimpleSeo } from "@/components/seo/simple-seo";

export default function AlbumDetailPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {!!data && <SimpleSeo title={data?.title} />}

      <Container maxWidth="xl" sx={{ py: { xs: 8, sm: 10 } }}>
        {!!data && (
          <>
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              <Grid xs={12} sm={6}>
                <CustomSwiper thumb>
                  {data.collection.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      {/* <Box
                      component="img"
                      src={item}
                      sx={{
                        aspectRatio: 16 / 9,
                        objectFit: "contain",
                        width: "100%",
                      }}
                    /> */}
                      <QualityImage
                        src={item}
                        alt={`${data.title}_image_${idx}`}
                      />
                    </SwiperSlide>
                  ))}
                </CustomSwiper>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography variant="h6">{data.title}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {data.publish_at}
                </Typography>
                <Typography variant="caption">{parse(data.content)}</Typography>
              </Grid>
            </Grid>
            {/* <CustomSwiper>

          </CustomSwiper> */}
          </>
        )}
      </Container>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }
  const data = await fetcher<{ result: IAlbumDetail }>(
    `/actualites/details/${context.params.slug}`
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
