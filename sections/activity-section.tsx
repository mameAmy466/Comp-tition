import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import CalendarIcon from "@/icons/CalendarIcon";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import TextMaxLine from "@/components/text-max-line";
import { IActivitySectionData, IActivitySectionItem } from "@/types";
import useDetailDialog from "@/hooks/useDetailDialog";
import {useWidth} from "@/hooks/useResponsive";
import {useTranslation} from "next-i18next";

function ActivitySection({
  sectionData,
}: {
  sectionData: IActivitySectionData;
}) {
  // console.log(sectionData);
  const detailDialog = useDetailDialog();
  const {t} = useTranslation('common');

  return (
    <>
      <div className="section">
        <Container maxWidth="xl">
          <Stack
            alignItems="center"
            spacing={{ xs: 2, sm: 4 }}
            sx={{ pt: { xs: 0, sm: 10 }, mb: 4 }}
          >
            <div>
              <Typography
                variant="subtitle1"
                textAlign="center"
                mb={{ xs: 1, sm: 2 }}
              >
                  {t("activite.activites")}
              </Typography>
              {/*<Typography variant="body2" textAlign="center">*/}
              {/*    {t("activite.desc")}*/}
              {/*</Typography>*/}
            </div>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "unset", md: "repeat(2, 1fr)" },
              gap: { xs: 1, sm: 2 },
              gridTemplateRows: "auto",
              gridTemplateAreas: {
                md: `
                     "main ."
                     "main ."
                    `,
              },
            }}
          >
            {/* {sectionData.result.slice(0, 5).map((item, idx) => ( */}
            {sectionData.result.map((item, idx) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    cursor: "pointer",
                    gridArea: idx === 0 ? { xs: "unset", md: "main" } : "unset",
                      marginBottom: '1px'
                  }}
                  onClick={() => {
                    detailDialog.showDialog(item.type, item.slug, "activity");
                  }}
                >
                  {idx !== 0 ? (
                    <ActivityItem item={item} />
                  ) : (
                    <ActivityMainItem item={item} />
                  )}
                </Box>
              );
            })}
          </Box>

          <div style={{ display: "flex" }}>
            {/*<Button*/}
            {/*  sx={{*/}
            {/*    backgroundColor: "#4991FD",*/}
            {/*    color: "white",*/}
            {/*    mx: "auto",*/}
            {/*    mt: { xs: 2, sm: 4 },*/}
            {/*  }}*/}
            {/*  variant="contained"*/}
            {/*>*/}
            {/*  Voir plus*/}
            {/*</Button>*/}
          </div>
        </Container>
      </div>
    </>
  );
}

function ActivityItem({ item }: { item: IActivitySectionItem }) {
  return (
    <Paper sx={{ p: { xs: 0.5, sm: 1 } }}>
      <Stack alignItems="center" spacing={{ xs: 1, sm: 2 }} direction="row">
        <Box
          component="img"
          src={item.image}
          sx={{
            aspectRatio: 1 / 1,
            width: {
              xs: 90,
              sm: 120,
              md: 150,
              lg: 180,
            },
            objectFit: "cover",
          }}
        />
        <Stack
          flexGrow={1}
          height={{
            xs: 90,
            sm: 120,
            md: 150,
            lg: 180,
          }}
        >
          <TextMaxLine variant="subtitle1" line={2}>
            {item.title}
          </TextMaxLine>
          <Box flexGrow={1} />
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Stack spacing={0.5} direction="row" alignItems="center">
              <CalendarIcon sx={{ width: 16, height: 16 }} />
              <Typography variant="caption">{item.publish_at}</Typography>
            </Stack>
            <Button
              sx={{
                textTransform: "none",
                color: "white",
              }}
              endIcon={<ArrowOutwardIcon />}
            >
              Lire plus
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

function ActivityMainItem({ item }: { item: IActivitySectionItem }) {
    const screen = useWidth();

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };
  return (
    <Box
      position="relative"
      sx={{
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${item.image})`,
      }}
    >
      <Box
        sx={{
          bottom: 0,
          position: "absolute",
          p: { xs: 0.1, sm: 2 },
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: "white",
          width: '95%',
        }}
      >
        <Typography variant="subtitle1" sx={{fontSize: screen === 'xs' ? '12px' : '1rem'}}>
            {screen === 'xs' ? truncateText(item.title, 40) : item.title}
            {/*{item.title}*/}
        </Typography>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <CalendarIcon sx={{ width: 16, height: 16 }} />
          <Typography variant="caption">{item.publish_at}</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
export default ActivitySection;
