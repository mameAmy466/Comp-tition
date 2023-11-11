import { Fragment, MutableRefObject } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@/icons/PhoneIcon";
import useDetailDialog from "@/hooks/useDetailDialog";
import {IFooterSectionData} from "@/types";
import {useTranslation} from "next-i18next";

const LINKS = [
  {
    headline: "Candidat",
    children: [{ name: "Déposer ma candidature", href: "/" }],
  },
  {
    headline: "Menu",
    children: [
      { name: "Inscription", href: "#" },
      { name: "Guide", href: "#" },
      { name: "Actualité", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  },
  {
    headline: "Ressources",
    children: [
      { name: "Blogs", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  },
  {
    headline: "Contact",
    children: [{ name: "+221 33 864 55 55", href: "#" }],
  },
];

export default function Footer({
  sectionIndex,
  moveToRef,
  sectionData,
}: {
  sectionIndex: number;
  moveToRef: MutableRefObject<any>;
  sectionData: IFooterSectionData;
}) {
  const detailDialog = useDetailDialog();
  const {t} = useTranslation('common');

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xl" sx={{ pb: 2 }}>
        <Stack spacing={2}>
          <Grid container spacing={1} justifyContent="space-between">
            <Grid xs={12} md={3}>
              <Typography component="div" variant="subtitle1">
                { sectionData.title }
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  maxWidth: { md: 270, xs: "auto" },
                }}
              >
                { sectionData.desc }
              </Typography>
            </Grid>

            <Grid container xs={12} md={8} spacing={2}>
              <Grid xs={7} md={4} columns={{ xs: 12, md: 15 }}>
                <Stack
                  spacing={{ xs: 0, md: 1 }}
                  alignItems={{ md: "flex-start" }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="subtitle1">
                    {t("footer.candidat")}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                      onClick={() => {
                        detailDialog.showDialog("form", "c", "candidate");
                      }}
                    >
                      {t("footer.deposer_candidature")}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                      onClick={() => {
                        detailDialog.showDialog("form", "c", "candidate");
                      }}
                    >
                      {t("footer.verifier_candidature")}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid xs={5} md={4} columns={{ xs: 12, md: 15 }}>
                <Stack
                  spacing={{ xs: 0, md: 1 }}
                  alignItems={{ md: "flex-start" }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="subtitle1">
                    {t("footer.menu")}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                      onClick={() => {
                        detailDialog.showDialog("form", "c", "candidate");
                      }}
                    >
                      {t("nav.inscrire")}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                      onClick={() => {
                        if (moveToRef.current) {
                          moveToRef.current(3);
                        }
                      }}
                    >
                      {t("nav.guide")}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                      onClick={() => {
                        if (moveToRef.current) {
                          moveToRef.current(4);
                        }
                      }}
                    >
                      {t("nav.activites")}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                      onClick={() => {
                        if (moveToRef.current) {
                          moveToRef.current(5);
                        }
                      }}
                    >
                      {t("nav.faq")}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              {/*<Grid xs={6} md={3} columns={{ xs: 12, md: 15 }}>*/}
              {/*  <Stack*/}
              {/*    spacing={{ xs: 0, md: 1 }}*/}
              {/*    alignItems={{ md: "flex-start" }}*/}
              {/*    sx={{ width: 1 }}*/}
              {/*  >*/}
              {/*    <Typography component="div" variant="subtitle1">*/}
              {/*      Ressources*/}
              {/*    </Typography>*/}
              {/*    <Stack spacing={1}>*/}
              {/*      <Link*/}
              {/*        color="inherit"*/}
              {/*        variant="body2"*/}
              {/*        sx={{ textDecoration: "none" }}*/}
              {/*      >*/}
              {/*        Blogs*/}
              {/*      </Link>*/}
              {/*      <Typography*/}
              {/*        color="inherit"*/}
              {/*        variant="body2"*/}
              {/*        sx={{*/}
              {/*          cursor: "pointer",*/}
              {/*        }}*/}
              {/*        onClick={() => {*/}
              {/*          if (moveToRef.current) {*/}
              {/*            moveToRef.current(5);*/}
              {/*          }*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        FAQ*/}
              {/*      </Typography>*/}
              {/*    </Stack>*/}
              {/*  </Stack>*/}
              {/*</Grid>*/}

              <Grid xs={12} md={4} columns={{ xs: 12, md: 15 }}>
                <Stack
                  spacing={1}
                  alignItems={{ md: "flex-start" }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="subtitle1">
                    {t("footer.contact")}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon
                      sx={{
                        width: { xs: 18, sm: 24 },
                        height: { xs: 18, sm: 24 },
                      }}
                    />
                    <Link
                      href="tel:+221 33 864 55 55"
                      color="inherit"
                      variant="body2"
                      sx={{
                        textDecoration: "none",
                        fontSize: { xs: 14, sm: 16 },
                      }}
                    >
                      +221 33 864 55 55
                    </Link>
                  </Stack>
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: "#06883E",
                      color: "white",
                      fontSize: 12,
                      borderRadius: 0,
                    }}
                  >
                    {t("footer.nous_contacter")}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* social buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {[
              "/apropos/linkedin.png",
              "/apropos/facebook.png",
              "/apropos/twitter.png",
              "/apropos/youtube.png",
              "/apropos/instagram.png",
            ].map((item, idx) => (
              <SocialItem key={idx} src={item} />
            ))}
          </Stack>

          <Divider />
          <Stack direction="row" spacing={2}>
            {/* social buttons */}
            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: { xs: "flex", sm: "none" } }}
              >
                {[
                  "/apropos/linkedin.png",
                  "/apropos/facebook.png",
                  "/apropos/twitter.png",
                  "/apropos/youtube.png",
                  "/apropos/instagram.png",
                ].map((item, idx) => (
                  <SocialItem key={idx} src={item} />
                ))}
              </Stack>
              <Typography variant="caption">
                © 2023. aCANGroup. All rights reserved
              </Typography>
            </Box>

            <Stack
              flexGrow={1}
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0, sm: 2 }}
            >
              <Box flexGrow={1} textAlign={{ xs: "start", sm: "center" }}>
                <Link href="#" color="inherit" variant="caption">
                  Français
                </Link>
              </Box>
              <Link href="#" color="inherit" variant="caption">
                {t("footer.termes_conditions")}
              </Link>
              <Divider
                flexItem
                orientation="vertical"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
              <Link href="#" color="inherit" variant="caption">
                {t("footer.policy")}
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function SocialItem({ src, href = "#" }: { src: string; href?: string }) {
  return (
    <Link href={href}>
      <Box
        src={src}
        component="img"
        sx={{ width: { xs: 16, sm: 40 }, aspectRatio: 1 / 1 }}
      />
    </Link>
  );
}
