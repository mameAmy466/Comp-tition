import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";

import useSWR from "swr";
import parse from "html-react-parser";

import CloseIcon from "@/icons/CloseIcon";
import { IVideoDetail } from "@/types";
import FadeTransition from "../FadeTransition";
import LoadingScreen from "../LoadingScreen";
import QualityImage from "../QualityImage";
import VideoPlayer from "../video-player";
import CustomSwiper from "../swiper";
import { SwiperSlide } from "swiper/react";
import { Avatar } from "@mui/material";

interface LiveEventDialog {
  open: boolean;
  handleClose: VoidFunction;
  slug: string;
}
function LiveEventDialog({ open, handleClose, slug }: LiveEventDialog) {
  const { data, isLoading } = useSWR<{ result: IVideoDetail }>(slug);
  // console.log(data);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: "#0A2752",
          color: "white",
          // backgroundImage: 'url(/apropos/bg1.png)',
          // backgroundRepeat: 'no-repeat'a,
          // backgroundPosition: 'center',
          // backgroundSize: 'cover',
        },
      }}
      TransitionComponent={FadeTransition}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 8, sm: 10 } }}>
        {isLoading && <LoadingScreen sx={{ color: "black" }} />}
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
                <VideoPlayer src={data.result.url} />
                <Box sx={{ mt: 2, display: "flex" }}>
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
                    <Typography variant="h6">{data.result.title}</Typography>
                    <div>{parse(data.result.content)}</div>
                  </div>
                </Box>
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

      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: "16px",
          right: "16px",
          color: "white",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default LiveEventDialog;
