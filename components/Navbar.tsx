import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState, MutableRefObject, ChangeEventHandler } from "react";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import HomeIcon from "@/icons/HomeIcon";
import MobileMenuIcon from "@/icons/MobileMenuIcon";
import useDetailDialog from "@/hooks/useDetailDialog";
import { ILangueData } from "@/types";

function LanguageSwitcher({
  color,
  value,
  onChange,
  langueData,
}: {
  color: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  langueData: ILangueData;
}) {
  return (
    <TextField
      select
      size="small"
      value={value}
      onChange={onChange}
      SelectProps={{
        MenuProps: {
          slotProps: { paper: { sx: { borderRadius: 0 } } },
          MenuListProps: { dense: true, sx: { py: 0, borderRadius: 0 } },
        },
      }}
      InputProps={{
        sx: {
          color,
          border: `1px ${color} !important`,
          borderRadius: 0,
          "& .MuiSvgIcon-root": {
            color,
          },
          "& > div": {
            border: `1px solid ${color}`,
            borderRadius: 0,
          },
          "& .MuiOutlinedInput-input": {
            py: 0.5,
            px: 1,
          },
          "&.MuiOutlinedInput-root:hover": {
            border: `1px solid ${color} !important`,
            color,
          },
        },
      }}
      sx={{ ml: "auto" }}
    >
      {langueData.result.map((langue) => (
        <MenuItem key={langue.code} value={langue.code}>
          {langue.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

function Navbar({
  sectionIndex,
  moveToRef,
  langueData,
}: {
  sectionIndex: number;
  moveToRef: MutableRefObject<any>;
  langueData: ILangueData;
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const detailDialog = useDetailDialog();
  const { t } = useTranslation("common");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {sectionIndex === 0 && (
        <AppBar
          position="absolute"
          sx={{
            backgroundImage: "none",
            boxShadow: "none",
            bgcolor: "transparent",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                paddingLeft: "0px !important",
                paddingRight: "0px !important",
              }}
            >
              <LanguageSwitcher
                langueData={langueData}
                color="white"
                value={router.locale!}
                onChange={(e) =>
                  router.push(
                    {
                      pathname: router.pathname,
                      query: router.query,
                    },
                    undefined,
                    { locale: e.target.value }
                  )
                }
              />
            </Toolbar>
          </Container>
        </AppBar>
      )}
      <AppBar
        position="absolute"
        sx={{
          backgroundImage: "none",
          bgcolor: sectionIndex === 0 ? "white" : "transparent",
          boxShadow: "none",
          borderBottom: "1px solid #DBDBDB",
          // display: {
          //   xs: [3, 5].includes(sectionIndex) ? "none" : "block",
          //   sm: "block",
          // },
          display: "block",
          ...(sectionIndex === 0 && { bottom: 0, top: "unset" }),
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
              minHeight: { xs: 64, sm: 80 },
            }}
          >
            <Box
              component="img"
              // src="/apropos/logo.png"
              src={ sectionIndex !==0 && sectionIndex % 2 === 0 ? "/apropos/logo2.png" : '/apropos/logo.png'}
              sx={{ width: { xs: 100, sm: 150 } }}
              alt="logo"
            />
            <Box flexGrow={1} />
            <Stack
              alignItems="center"
              direction="row"
              spacing={5}
              sx={{
                display: { xs: "none", sm: "flex" },
                color:
                  sectionIndex === 0
                    ? "black"
                    : sectionIndex % 2 === 0
                    ? "white"
                    : "black",
              }}
            >
              <HomeIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (moveToRef.current) {
                    moveToRef.current(1);
                  }
                }}
              />
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  // if (moveToRef.current) {
                  //   moveToRef.current(2);
                  // }
                  detailDialog.showDialog("form", "c", "candidate");
                }}
              >
                {t("nav.inscrire")}
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (moveToRef.current) {
                    moveToRef.current(3);
                  }
                }}
              >
                {t("nav.guide")}
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (moveToRef.current) {
                    moveToRef.current(4);
                  }
                }}
              >
                {t("nav.activites")}
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (moveToRef.current) {
                    moveToRef.current(5);
                  }
                }}
              >
                {t("nav.faq")}
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (moveToRef.current) {
                    moveToRef.current(6);
                  }
                }}
              >
                {t("nav.contact")}
              </Typography>
              {sectionIndex !== 0 && (
                <LanguageSwitcher
                  langueData={langueData}
                  color={sectionIndex % 2 === 0 ? "white" : "black"}
                  value={router.locale!}
                  onChange={(e) =>
                    router.push(
                      {
                        pathname: router.pathname,
                        query: router.query,
                      },
                      undefined,
                      { locale: e.target.value }
                    )
                  }
                />
              )}
            </Stack>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{
                  display: { xs: "block", sm: "none" },
                  color:
                    sectionIndex === 0
                      ? "black"
                      : sectionIndex % 2 === 0
                      ? "white"
                      : "black",
                }}
                onClick={handleClick}
              >
                <MobileMenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    // if (moveToRef.current) {
                    //   moveToRef.current(2);
                    // }
                    detailDialog.showDialog("form", "c", "candidate");
                  }}
                >
                  {t("nav.inscrire")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    if (moveToRef.current) {
                      moveToRef.current(3);
                    }
                  }}
                >
                  {t("nav.guide")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    if (moveToRef.current) {
                      moveToRef.current(4);
                    }
                  }}
                >
                  {t("nav.activites")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    if (moveToRef.current) {
                      moveToRef.current(5);
                    }
                  }}
                >
                  {t("nav.faq")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    if (moveToRef.current) {
                      moveToRef.current(6);
                    }
                  }}
                >
                  {t("nav.contact")}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
