import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import parse from "html-react-parser";

import CalendarIcon from "@/icons/CalendarIcon";
import LocationIcon from "@/icons/LocationIcon";
import { ITopSectionData } from "@/types";
import useDetailDialog from "@/hooks/useDetailDialog";

function TopSection({ sectionData }: { sectionData: ITopSectionData | null }) {
  const { t } = useTranslation();
  const formDialog = useDetailDialog();

    const backgroundImage = sectionData && sectionData.image ? `url(${sectionData.image})` : "url(/apropos/bg1-1.png)";
    const divStyle = {
        backgroundColor: "#06883E",
        backgroundImage: backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    };

  return (
    <>
      <div
        className="section top-section"
        style={divStyle}
      >
        <Container maxWidth="xl" sx={{ color: "white" }}>
          {!!sectionData && (
            <Container
              maxWidth="sm"
              sx={{
                mx: 0,
                paddingLeft: "0px !important",
                paddingRight: "0px !important",
              }}
            >
              <Typography variant="h4" mb={{ xs: 4, sm: 6 }}>
                {sectionData.name}
              </Typography>
              <Box sx={{ mb: { xs: 4, sm: 5 }, lineHeight: '30px' }}>
                {/* {parse(sectionData.content, parseOptions)} */}
                {sectionData.desc ? parse(sectionData.desc) : ""}
              </Box>
            </Container>
          )}
          <Stack
            spacing={{ xs: 3, sm: 0 }}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "start", sm: "end" }}
          >
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                formDialog.showDialog("form", "", "top");
              }}
              sx={{
                backgroundColor: "#019541",
                color: "white",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {t("top.apply")}
            </Button>
            <Box flexGrow={1} />
            <div>
              <Stack direction="row" spacing={2}>
                <CalendarIcon />
                <Typography variant="h6">{sectionData?.date}</Typography>
                {/*<Typography variant="h6">{sectionData?.publish_at}</Typography>*/}
              </Stack>
              <Stack direction="row" spacing={2}>
                <LocationIcon />
                <Typography variant="h6">{sectionData?.lieu}</Typography>
              </Stack>
            </div>
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default TopSection;
