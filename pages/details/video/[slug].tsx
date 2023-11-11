import {
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";

import fetcher from "@/utils/fetcher";
import { IVideoDetail } from "@/types";
import QualityImage from "@/components/QualityImage";
import VideoPlayer from "@/components/video-player";
import VideoPlayIcon from "@/icons/VideoPlayIcon";
import { SimpleSeo } from "@/components/seo/simple-seo";

export default function VideoDetailPage({
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
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            <Grid xs={12} sm={6}>
              <Box>
                <VideoPlayer src={data.url} />
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
                    <Typography variant="h6">{data.title}</Typography>
                    <div>{parse(data.content)}</div>
                  </div>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} sm={6}>
              <List sx={{ py: 0, "& > li:first-child": { pt: 0 } }}>
                {[1, 2, 3, 4].map((item) => (
                  <ListItem
                    key={item}
                    secondaryAction={
                      <IconButton edge="end" aria-label="play">
                        <VideoPlayIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar sx={{ mr: 2, width: { xs: 90, sm: 130 } }}>
                      <QualityImage
                        alt={`${data.title}_${item}`}
                        src={`/apropos/section4-thumb${item}.png`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Replay- Prestation Cheikh Hamidou Dieng - SENGAL"
                      primaryTypographyProps={{
                        sx: {
                          fontSize: { xs: "14px", sm: "16px", md: "18px" },
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
    </Box>
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
  const data = await fetcher<{ result: IVideoDetail }>(
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
