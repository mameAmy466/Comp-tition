import React, { FormEventHandler, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import QualityImage from "@/components/QualityImage";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import useSWR from "swr";
import parse from "html-react-parser";

import CloseIcon from "@/icons/CloseIcon";
import { ICodeResponse } from "@/types";
import FadeTransition from "@/components/FadeTransition";
import LoadingScreen from "../LoadingScreen";
import {useTranslation} from "next-i18next";

interface CodeVerifyDialogProps {
  open: boolean;
  handleClose: VoidFunction;
}
function CodeVerifyDialog({ open, handleClose }: CodeVerifyDialogProps) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [code, setCode] = useState("");
  const { data, isLoading } = useSWR<ICodeResponse>(
    shouldFetch ? `/candidatures/show/${code}` : null
  );
  const {t} = useTranslation('common');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setShouldFetch(true);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: !!data ? "#0A2752" : "white",
        },
      }}
      TransitionComponent={FadeTransition}
    >
      {shouldFetch && isLoading && <LoadingScreen sx={{ color: "black" }} />}
      {!shouldFetch && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="xs" sx={{ my: "auto" }}>
            <Stack spacing={{ xs: 2, sm: 4 }} alignItems="center">
              <Typography textAlign="center" variant="subtitle1">
                  {t("candidature.prix_chef_etat_edition")}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Container maxWidth="xs">
                  <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center">
                    <Typography variant="h6">
                        {t("candidature.vérification_andidature")}
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="code"
                      label={t("candidature.code")}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <Button
                      fullWidth
                      size="small"
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: "#0A2752" }}
                    >
                        {t("candidature.verifier")}

                    </Button>
                  </Stack>
                </Container>
              </form>
            </Stack>
          </Container>
        </Container>
      )}
      {!!data && (
        <Container
          sx={{
            // my: "auto",
            color: "white",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            // background: "#0A2752",
          }}
        >
          <Container maxWidth="sm" sx={{ my: "auto" }}>
            <Stack spacing={{ xs: 2, sm: 4 }} alignItems="center">
              <Typography textAlign="center" variant="subtitle1">
                  {t("candidature.prix_chef_etat_edition")}
              </Typography>
              <Container maxWidth="sm">
                {data.status && !!data.result && (
                  <Grid container spacing={{ xs: 2, sm: 4 }}>
                    <Grid xs={12} sm={6}>
                      <QualityImage
                        alt="candiate_logo"
                        src={data.result.personalDetails.image}
                      />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Stack
                        spacing={2}
                        direction={{ xs: "column", sm: "row" }}
                      >
                        <Stack spacing={1} flex={1}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle1">
                              {`${data.result.personalDetails.firstname} ${data.result.personalDetails.lastname}`}
                            </Typography>
                            <Chip
                              label={data.result.candidature.status}
                              color={
                                data.result.candidature.status
                                  .toLowerCase()
                                  .startsWith("a")
                                  ? "success"
                                  : data.result.candidature.status
                                      .toLowerCase()
                                      .startsWith("r")
                                  ? "error"
                                  : "warning"
                              }
                              sx={{ borderRadius: 1 }}
                            />
                          </Stack>
                          <Divider flexItem sx={{ borderColor: "white" }} />
                          <Typography variant="caption">
                            {parse(
                              data.result.participation.autre_concours || ""
                            )}
                          </Typography>
                          {/* <Typography variant="body1">
                            Catégorie :{" "}
                            <Typography variant="body1" component="span">
                              psalmodie (Tajwid)
                            </Typography>{" "}
                          </Typography> */}
                          <Typography variant="body1">
                            Age :{" "}
                            <Typography variant="body1" component="span">
                              {data.result.personalDetails.date_naiss}
                            </Typography>{" "}
                          </Typography>
                          <Typography variant="body1">
                            Pays :{" "}
                            <Typography variant="body1" component="span">
                              {data.result.contact.pays || ""}
                            </Typography>{" "}
                          </Typography>
                          {/* <Typography variant="body1">
                            Ecole :{" "}
                            <Typography variant="body1" component="span">
                              Alhimma School
                            </Typography>{" "}
                          </Typography> */}
                          <Typography variant="body1">
                            Riwâyat :{" "}
                            <Typography variant="body1" component="span">
                              {data.result.participation.riwayat || ""}
                            </Typography>{" "}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                )}
                {!data.status && (
                  <Typography variant="body1" textAlign="center">
                    {data.msg}
                  </Typography>
                )}
              </Container>
            </Stack>
          </Container>
        </Container>
      )}
      <IconButton
        onClick={handleClose}
        sx={{
          top: "16px",
          right: "16px",
          position: "absolute",
          color: !!data ? "white" : "black",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default CodeVerifyDialog;
