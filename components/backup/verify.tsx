import { FormEventHandler, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

import { API_HEAD_URL } from "@/constants";
import QualityImage from "@/components/QualityImage";

interface ICodeResult {}
interface ICodeResponse {
  status: boolean;
  result?: ICodeResult;
  msg: string;
}
function VerifyPage() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState<ICodeResponse>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await fetch(API_HEAD_URL + `/candidatures/show/${code}`);
    setResponse((await res.json()) as ICodeResponse);
  };

  console.log(response);
  if (!response) {
    return (
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
              Prix International du Chef de l&apos;Etat pour le Récital de Coran
              - EDITION 2023
            </Typography>
            <form onSubmit={handleSubmit}>
              <Container maxWidth="xs">
                <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center">
                  <Typography variant="h6">
                    Vérification de Candidature
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="code"
                    label="Code"
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
                    Vérifier
                  </Button>
                </Stack>
              </Container>
            </form>
          </Stack>
        </Container>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        // my: "auto",
        color: "white",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#0A2752",
      }}
    >
      <Container maxWidth="sm" sx={{ my: "auto" }}>
        <Stack spacing={{ xs: 2, sm: 4 }} alignItems="center">
          <Typography textAlign="center" variant="subtitle1">
            Prix International du Chef de l&apos;Etat pour le Récital de Coran -
            EDITION 2023
          </Typography>
          <Container maxWidth="sm">
            {response.status && !!response.result && (
              <Grid container spacing={{ xs: 2, sm: 4 }}>
                <Grid xs={12} sm={6}>
                  <QualityImage
                    alt="candiate_logo"
                    src="/apropos/section4-thumb1.png"
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                    <Stack spacing={1} flex={1}>
                      <Typography variant="subtitle1">
                        Cheikh Hamidou Dieng{" "}
                      </Typography>
                      <Divider flexItem sx={{ borderColor: "white" }} />
                      <Typography variant="caption">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat.
                      </Typography>
                      <Typography variant="body1">
                        Catégorie :{" "}
                        <Typography variant="body1" component="span">
                          psalmodie (Tajwid)
                        </Typography>{" "}
                      </Typography>
                      <Typography variant="body1">
                        Age :{" "}
                        <Typography variant="body1" component="span">
                          17 ans
                        </Typography>{" "}
                      </Typography>
                      <Typography variant="body1">
                        Pays :{" "}
                        <Typography variant="body1" component="span">
                          Sénégal
                        </Typography>{" "}
                      </Typography>
                      <Typography variant="body1">
                        Ecole :{" "}
                        <Typography variant="body1" component="span">
                          Alhimma School
                        </Typography>{" "}
                      </Typography>
                      <Typography variant="body1">
                        Riwâyat :{" "}
                        <Typography variant="body1" component="span">
                          Warsh
                        </Typography>{" "}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            )}
            {!response.status && (
              <Typography variant="body1" textAlign="center">
                {response.msg}
              </Typography>
            )}
          </Container>
        </Stack>
      </Container>
    </Container>
  );
}

export default VerifyPage;
