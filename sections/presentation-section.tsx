import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {IPresentationSectionData} from "@/types";
import useDetailDialog from "@/hooks/useDetailDialog";
import {useTranslation} from "next-i18next";

function PresentationSection({ sectionData }: { sectionData: IPresentationSectionData }) {
    const detailDialog = useDetailDialog();
    const {t} = useTranslation('common');

    return (
    <div className="section">
      <Container maxWidth="xl">
        <Stack
          justifyContent="center"
          alignItems={{ xs: "start", sm: "center" }}
          height="100vh"
          spacing={{ xs: 4, sm: 10 }}
        >
          <Typography variant="body2">
              {sectionData.title}
          </Typography>
          <Stack
            spacing={4}
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
          >
            <Box flex={1}>
              <Box>
                <Box
                  component="img"
                  src="/apropos/section2.png"
                  alt="section2_logo"
                  sx={{
                    objectFit: "fill",
                    aspectRatio: 16 / 9,
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
            <Box flex={1}>
              <Stack spacing={4}>
                <Typography variant="h6">
                    {sectionData.title}
                </Typography>
                <Typography variant="body2">
                    {sectionData.desc}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent={{ xs: "center", sm: "start" }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#019541",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={() => {
                        detailDialog.showDialog("text", sectionData.items[0].slug, "presentation");
                    }}
                  >
                      {t("presentation.lire_plus")}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Stack
            spacing={{ xs: 1, sm: 4 }}
            direction="row"
            alignItems="center"
            width="100%"
          >
            <Box flex={1}>
              <Paper elevation={1} sx={{ p: { xs: 1, sm: 4, md: 6 } }}>
                <Box
                  component="img"
                  src="/apropos/section2-logo1.png"
                  sx={{
                    objectFit: "contain",
                    aspectRatio: 16 / 9,
                    width: "100%",
                  }}
                />
              </Paper>
            </Box>
            <Box flex={1}>
              <Paper elevation={1} sx={{ p: { xs: 1, sm: 4, md: 6 } }}>
                <Box
                  component="img"
                  src="/apropos/section2-logo2.png"
                  sx={{
                    objectFit: "contain",
                    aspectRatio: 16 / 9,
                    width: "100%",
                  }}
                />
              </Paper>
            </Box>
            <Box flex={1}>
              <Paper elevation={1} sx={{ p: { xs: 1, sm: 4, md: 6 } }}>
                <Box
                  component="img"
                  src="/apropos/section2-logo3.png"
                  sx={{
                    objectFit: "contain",
                    aspectRatio: 16 / 9,
                    width: "100%",
                  }}
                />
              </Paper>
            </Box>
            <Box flex={1}>
              <Paper elevation={1} sx={{ p: { xs: 1, sm: 4, md: 6 } }}>
                <Box
                  component="img"
                  src="/apropos/section2-logo4.png"
                  sx={{
                    objectFit: "contain",
                    aspectRatio: 16 / 9,
                    width: "100%",
                  }}
                />
              </Paper>
            </Box>
            <Box flex={1}>
              <Paper elevation={1} sx={{ p: { xs: 1, sm: 4, md: 6 } }}>
                <Box
                  component="img"
                  src="/apropos/section2-logo5.png"
                  sx={{
                    objectFit: "contain",
                    aspectRatio: 16 / 9,
                    width: "100%",
                  }}
                />
              </Paper>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default PresentationSection;
