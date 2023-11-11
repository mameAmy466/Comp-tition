import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@/icons/CloseIcon";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import useSWR from "swr";
import { SwiperSlide } from "swiper/react";
import parse from "html-react-parser";

import { IAlbumDetail } from "@/types";
import FadeTransition from "../FadeTransition";
import LoadingScreen from "../LoadingScreen";
import CustomSwiper from "../swiper";
import QualityImage from "../QualityImage";

interface AlbumDetailDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  slug: string;
}
function AlbumDetailDialog({
  open,
  handleClose,
  slug,
}: AlbumDetailDialogProps) {
  const { data, isLoading } = useSWR<{ result: IAlbumDetail }>(slug);
  // console.log(data);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      // PaperProps={{
      //   sx: {
      //     backgroundColor: '#0A2752',
      //     backgroundImage: 'url(/apropos/bg1.png)',
      //     backgroundRepeat: 'no-repeat'a,
      //     backgroundPosition: 'center',
      //     backgroundSize: 'cover',
      //   },
      // }}
      TransitionComponent={FadeTransition}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 8, sm: 10 } }}>
        {isLoading && <LoadingScreen sx={{ color: "black" }} />}
        {!!data && (
          <>
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              <Grid xs={12} sm={6}>
                <CustomSwiper thumb>
                  {data.result.collection.map((item, idx) => (
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
                        alt={`${data.result.title}_image_${idx}`}
                      />
                    </SwiperSlide>
                  ))}
                </CustomSwiper>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography variant="h6">{data.result.title}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {data.result.publish_at}
                </Typography>
                <Typography variant="caption">
                  {parse(data.result.content)}
                </Typography>
              </Grid>
            </Grid>
            {/* <CustomSwiper>

          </CustomSwiper> */}
          </>
        )}
      </Container>

      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: "16px",
          zIndex: 2,
          right: "16px",
          color: "black",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default AlbumDetailDialog;
