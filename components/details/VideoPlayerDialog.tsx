import useSWR from "swr";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";

import { IVideoDetail } from "@/types";
import CloseIcon from "@/icons/CloseIcon";
import VideoPlayIcon from "@/icons/VideoPlayIcon";
import LoadingScreen from "../LoadingScreen";
import QualityImage from "../QualityImage";
import VideoPlayer from "../video-player";
import FadeTransition from "../FadeTransition";

interface VideoPlayerDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  slug: string;
}
function VideoPlayerDialog({
  open,
  handleClose,
  slug,
}: VideoPlayerDialogProps) {
  const { data, isLoading } = useSWR<{ result: IVideoDetail }>(slug);
  // console.log(data);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: "#142618",
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
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            <Grid xs={12} sm={6}>
              <Box>
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
              </Box>
            </Grid>
            <Grid xs={12} sm={6}>
              <List>
                {[1, 2, 3, 4].map((item) => (
                  <ListItem
                    key={item}
                    sx={{backgroundColor: "#06883E", marginBottom: "25px", padding: "10px"}}
                    secondaryAction={
                      <IconButton edge="end" aria-label="play">
                        <VideoPlayIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar sx={{ mr: 2, width: { xs: 90, sm: 130 } }}>
                      <QualityImage
                        alt={`${data.result.title}_${item}`}
                        src={`/apropos/section4-thumb${item}.png`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Replay- Prestation Cheikh Hamidou Dieng - SENGAL"
                      primaryTypographyProps={{
                        sx: {
                          fontSize: { xs: "14px", sm: "16px", md: "18px" },
                          paddingBottom: "30px",
                        },
                      }}
                      secondary="23/10/2023"
                      secondaryTypographyProps={{
                        sx: {
                          color: "white",
                          fontSize: { xs: "12px", sm: "14px" },
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
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

export default VideoPlayerDialog;
