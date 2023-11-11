import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";

import { IGuideSectionData } from "@/types";
import useDetailDialog from "@/hooks/useDetailDialog";
import {useTranslation} from "next-i18next";

function GuideSection({ sectionData }: { sectionData: IGuideSectionData }) {
  const detailDialog = useDetailDialog();
  const {t} = useTranslation('common');

  return (
    <>
      <div
        className="section"
        style={{
          backgroundImage:
            "url(/apropos/section3-right-corner.png), url(/apropos/section3-left-corner.png)",
          backgroundPosition: "right top, left bottom",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "100px 100px, 100px 100px",
          backgroundColor: "#0A2752",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 2, sm: 4 }} alignItems="center">
            <div style={{ color: "white" }}>
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
            <Grid
              container
              spacing={{ xs: 2, sm: 4, md: 6 }}
              alignItems="stretch"
            >
              {sectionData.items.map((item) => (
                <Grid xs={12} sm={4} key={item.id}>
                  <Paper
                    variant="outlined"
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      borderColor: "#7C8594",
                      p: { xs: 1, sm: 2, md: 4 },
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: { xs: 60, sm: 90 },
                      backgroundColor: "#132E55",
                    }}
                    onClick={() => {
                      detailDialog.showDialog("text", item.slug, "guide");
                    }}
                  >
                    <ArrowOutwardIcon
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "#7C8594",
                      }}
                    />
                    <Typography textAlign="center" variant="subtitle1">
                      {item.title}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4991FD", color: "white" }}
              onClick={() => {
                detailDialog.showDialog("form", "c", "candidate");
              }}
            >
                {t("candidature.deposer")}
            </Button>
          </Stack>
        </Container>
      </div>
      {/* {detail.value && !!selectedItem && (
        <ArticleDetailDialog
          open={detail.value}
          handleClose={detail.onFalse}
          slug={`/pages/details/guide/${selectedItem.slug}`}
        />
      )} */}
    </>
  );
}
export default GuideSection;
