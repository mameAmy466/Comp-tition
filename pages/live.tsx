import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { SwiperSlide } from "swiper/react";
// import parse from "html-react-parser";

import fetcher from "@/utils/fetcher";
import { ILiveEvent } from "@/types";
import QualityImage from "@/components/QualityImage";
import CustomSwiper from "@/components/swiper";
import VideoPlayer from "@/components/video-player";
import { SimpleSeo } from "@/components/seo/simple-seo";

export default function LiveEventPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Box
      sx={{
        color: "white",
        minHeight: "100vh",
        backgroundColor: "#0A2752",
      }}
    >
      {!!data && <SimpleSeo title={data?.title} />}

      <Container maxWidth="xl" sx={{ py: { xs: 8, sm: 10 } }}>
        {!!data && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">
                Prix International du Chef de l&apos;Etat pour le Récital de
                Coran - EDITION 2023
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {["Français", "Arabe", "Anglais", "Wolof"].map((item) => (
                  <Button
                    key={item}
                    size="small"
                    sx={{ backgroundColor: "#405D87", color: "white" }}
                  >
                    {item}
                  </Button>
                ))}
              </Stack>
            </Box>
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              <Grid xs={12} sm={6}>
                <VideoPlayer src={data.url} />
                {/* <Box sx={{ mt: 2, display: "flex" }}>
                  <Box
                    alt="ploygon_svg"
                    component="img"
                    src="/apropos/polygon.svg"
                    sx={{
                      width: { xs: 54, sm: 74 },
                      height: { xs: 54, sm: 74 },
                      mr: 1,
                    }}
                  />
                  <div>
                    <Typography variant="h6">{data.title}</Typography>
                    <div>{parse(data.content)}</div>
                  </div>
                </Box> */}
              </Grid>
              <Grid xs={12} sm={6}>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                  <Stack spacing={1} flex={1}>
                    <Typography variant="subtitle1">
                      Cheikh Hamidou Dieng{" "}
                    </Typography>
                    <Divider flexItem sx={{ borderColor: "white" }} />
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat.
                    </Typography>
                    <Typography variant="body1">
                      Catégorie :{" "}
                      <Typography variant="body1" component="span">
                        psalmodie (Tajwid)
                      </Typography>{" "}
                    </Typography>
                    <Typography variant="body1">
                      Age :{" "}
                      <Typography variant="body1" component="span">
                        17 ans
                      </Typography>{" "}
                    </Typography>
                    <Typography variant="body1">
                      Pays :{" "}
                      <Typography variant="body1" component="span">
                        Sénégal
                      </Typography>{" "}
                    </Typography>
                    <Typography variant="body1">
                      Ecole :{" "}
                      <Typography variant="body1" component="span">
                        Alhimma School
                      </Typography>{" "}
                    </Typography>
                    <Typography variant="body1">
                      Riwâyat :{" "}
                      <Typography variant="body1" component="span">
                        Warsh
                      </Typography>{" "}
                    </Typography>
                  </Stack>
                  <Box flex={1}>
                    <QualityImage
                      alt="person_avatar"
                      src="/apropos/section4-thumb1.png"
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ borderColor: "white", my: 2 }} />
            <CustomSwiper
              slidesPerView={1}
              breakpoints={{
                640: {
                  centeredSlides: false,
                  slidesPerView: 2,
                  // spaceBetween: 30,
                },
                1024: {
                  centeredSlides: false,
                  slidesPerView: 3,
                  // spaceBetween: 50,
                },
              }}
            >
              {[1, 2, 3].map((item) => (
                <SwiperSlide key={item}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={`/apropos/section4-thumb${item}.png`}
                      sx={{ mr: 2 }}
                    />
                    <div>
                      <Typography variant="subtitle1">
                        Cheikh Hamidou Dieng - SENEGAL
                      </Typography>
                      <Typography variant="caption">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod
                      </Typography>
                    </div>
                  </Box>
                </SwiperSlide>
              ))}
            </CustomSwiper>
          </>
        )}
      </Container>
    </Box>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const data = await fetcher<ILiveEvent>(`/live/event`);
  return {
    props: { data },
  };
  // return {
  //   notFound: true,
  // };
}
