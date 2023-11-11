import { MutableRefObject } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Footer from "@/components/Footer";
import {IFooterSectionData} from "@/types";

function FooterSection({
  sectionIndex,
  moveToRef,
  sectionData,
  footerData,
}: {
  sectionIndex: number;
  moveToRef: MutableRefObject<any>;
  sectionData: IFooterSectionData;
  footerData: IFooterSectionData;
}) {
  return (
    <div className="section">
      <Container maxWidth="xl">
          {sectionData && sectionData.title ? (
              <Stack spacing={{ xs: 1, sm: 4 }}>
                  <Stack spacing={{ xs: 2, sm: 4 }} alignItems="center">
                      <div>
                          <Typography
                              variant="subtitle1"
                              textAlign="center"
                              mb={{ xs: 1, sm: 2 }}
                          >
                              {sectionData.title}
                          </Typography>
                          <Typography variant="body2" textAlign="center">
                              {sectionData.desc}
                          </Typography>
                      </div>
                  </Stack>
                  <Grid container spacing={2}>
                      <Grid xs={4} md={2}>
                          <Paper elevation={2} sx={{ p: { xs: 0.5, sm: 1, md: 2 } }}>
                              <Box
                                  component="img"
                                  src="/apropos/rts.png"
                                  alt="RTS"
                                  sx={{
                                      aspectRatio: 16 / 9,
                                      objectFit: "contain",
                                      width: "100%",
                                  }}
                              />
                          </Paper>
                      </Grid>
                      <Grid xs={4} md={2}>
                          <Paper elevation={2} sx={{ p: { xs: 0.5, sm: 1, md: 2 } }}>
                              <Box
                                  component="img"
                                  src="/apropos/sedima.png"
                                  alt="spotify"
                                  sx={{
                                      aspectRatio: 16 / 9,
                                      objectFit: "contain",
                                      width: "100%",
                                  }}
                              />
                          </Paper>
                      </Grid>
                      <Grid xs={4} md={2}>
                          <Paper elevation={2} sx={{ p: { xs: 0.5, sm: 1, md: 2 } }}>
                              <Box
                                  component="img"
                                  src="/apropos/ccbm.png"
                                  alt="slack"
                                  sx={{
                                      aspectRatio: 16 / 9,
                                      objectFit: "contain",
                                      width: "100%",
                                  }}
                              />
                          </Paper>
                      </Grid>
                      <Grid xs={4} md={2}>
                          <Paper elevation={2} sx={{ p: { xs: 0.5, sm: 1, md: 2 } }}>
                              <Box
                                  component="img"
                                  src="/apropos/consortium.png"
                                  alt="adobe"
                                  sx={{
                                      aspectRatio: 16 / 9,
                                      objectFit: "contain",
                                      width: "100%",
                                  }}
                              />
                          </Paper>
                      </Grid>
                      <Grid xs={4} md={2}>
                          <Paper elevation={2} sx={{ p: { xs: 0.5, sm: 1, md: 2 } }}>
                              <Box
                                  component="img"
                                  src="/apropos/acan.png"
                                  alt="webflow"
                                  sx={{
                                      aspectRatio: 16 / 9,
                                      objectFit: "contain",
                                      width: "100%",
                                  }}
                              />
                          </Paper>
                      </Grid>
                      <Grid xs={4} md={2}>
                          <Paper elevation={2} sx={{ p: { xs: 0.5, sm: 1, md: 2 } }}>
                              <Box
                                  component="img"
                                  src="/apropos/mboup.png"
                                  alt="zoom"
                                  sx={{
                                      aspectRatio: 16 / 9,
                                      objectFit: "contain",
                                      width: "100%",
                                  }}
                              />
                          </Paper>
                      </Grid>
                  </Grid>

                  {/* Footer */}
                  <Footer sectionData={footerData} sectionIndex={sectionIndex} moveToRef={moveToRef} />
              </Stack>
          ) : (
              <Footer sectionData={footerData} sectionIndex={sectionIndex} moveToRef={moveToRef} />
          )}
      </Container>
    </div>
  );
}

export default FooterSection;
