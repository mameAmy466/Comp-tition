import { FormEventHandler, useState } from "react";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { ICandidateForm } from "@/types";
import { API_HEAD_URL } from "@/constants";
import { APPROBATION_FILE } from "@/constants";
import PreviousIcon from "@/icons/PreviousIcon";
import NextIcon from "@/icons/NextIcon";
import SuccessCheckIcon from "@/icons/SuccessCheckIcon";
import CandidateFormField from "./CandidateFormField";
import { useBoolean } from "@/hooks/useBoolean";
import CodeVerifyDialog from "./CodeVerifyDialog";
import {useTranslation} from "next-i18next";

interface MultiStepFormProps {
  steps: ICandidateForm[];
}

interface IFormResponse {
  status: boolean;
  msg: string;
  numero_candidature: string;
}

function MultiStepForm({ steps }: MultiStepFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const verifyDialog = useBoolean(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<IFormResponse>();
  const { t } = useTranslation('common');

  const downloadApprobationFile = () => {
    if (typeof window !== "undefined" && APPROBATION_FILE !== undefined){
      window.location.href = APPROBATION_FILE
    }
  }

  const handleNext: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!formData.image) {
      setErrorMsg(t("candidature.select_file"))
      return;
    }
    if (!formData.file_piece) {
      setErrorMsg(t("candidature.select_file"))
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!formData.file_lettre_formelle && activeStep == 2) {
      setErrorMsg(t("candidature.select_file"))
      return;
    }
    const form_data = new FormData();
    for (const key in formData) {
      if (key === "date_naiss" && !formData["date_naiss"]) {
        form_data.append("date_naiss", "2000-01-01");
      } else {
        form_data.append(key, formData[key]);
      }
    }
    const response = await fetch(API_HEAD_URL + "/candidats/store", {
      method: "POST",
      body: form_data,
      // body: serialize(formData),
    });
    setResponse((await response.json()) as IFormResponse);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <>
      {activeStep < steps.length ? (
        <Grid container sx={{ height: "100%" }}>
          <Grid
            xs={12}
            sm={4}
            sx={{
              backgroundColor: "#06883E",
              backgroundImage: "url(/apropos/bg1.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <Stack spacing={5} textAlign="center">
              <div>
                <Typography variant="h5">{t("candidature.form_inscription")}</Typography>
                <Typography variant="body1">
                  {t('candidature.prix_chef_etat')}
                </Typography>
              </div>

              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-labelContainer .Mui-completed, & .MuiStepLabel-labelContainer .Mui-active, & .MuiStepLabel-labelContainer .Mui-disabled":
                          { color: "white !important" },
                      }}
                    >
                      {step.title}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-labelContainer .Mui-completed, & .MuiStepLabel-labelContainer .Mui-active, & .MuiStepLabel-labelContainer .Mui-disabled":
                          { color: "white !important" },
                      }}
                    >
                      {step.title}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            sm={8}
            sx={{
              display: "flex",
              position: "relative",
              backgroundColor: "white",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                position: "absolute",
                top: "16px",
                left: "16px",
                color: "white",
                backgroundColor: "#06883E",
                "&:hover": {
                  backgroundColor: "#405D87",
                },
              }}
              onClick={verifyDialog.onTrue}
            >
              {t("candidature.verify")}
            </Button>
            <Button
              sx={{
                position: "absolute",
                top: "16px",
                left: "350px",
                color: "white",
                backgroundColor: "#06883E",
                "&:hover": {
                  backgroundColor: "#405D87",
                },
              }}
              onClick={downloadApprobationFile}
            >
              {t('candidature.approbation_officielle')}
            </Button>
            <Container maxWidth="sm" sx={{ mt: { xs: 6, sm: 0 } }}>
              {!!steps[activeStep] && (
                <form onSubmit={handleNext}>
                  <Stack spacing={4}>
                    <div>
                      <Typography variant="h6">
                        {steps[activeStep].title}
                      </Typography>
                      {/* <Typography variant="caption">
                      Veuillez renseigner les champs et cliquer sur suivant
                    </Typography> */}
                    </div>
                    <Stack spacing={2}>
                      {/* {steps[activeStep].form.map((item, idx) => (
                      <CandidateFormField
                        key={`${item.title}_${idx}`}
                        item={item}
                        value={
                          formData[formDataStepKeys[activeStep]][item.name]
                        }
                        handleChange={(newValue) =>
                          setFormData((prev) => ({
                            ...prev,
                            [formDataStepKeys[activeStep]]: {
                              ...prev[formDataStepKeys[activeStep]],
                              [item.name]: newValue,
                            },
                          }))
                        }
                      />
                    ))} */}
                      {steps[activeStep].form.map((item, idx) => (
                        <CandidateFormField
                          key={`${item.title}_${idx}`}
                          errorMsg={errorMsg}
                          item={item}
                          value={formData[item.name]}
                          handleChange={(newValue) =>
                            setFormData((prev) => ({
                              ...prev,
                              [item.name]: newValue,
                            }))
                          }
                        />
                      ))}
                    </Stack>
                    <Stack direction="row">
                      {activeStep > 0 && (
                        <Button
                          variant="contained"
                          startIcon={<PreviousIcon />}
                          sx={{ backgroundColor: "#06883E", "&:hover": {backgroundColor: "#06883E"} }}
                          onClick={handleBack}
                        >
                          Précédent
                        </Button>
                      )}
                      <Box flexGrow={1} />
                      {activeStep == steps.length - 1 ? (
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ backgroundColor: "#06883E", "&:hover": {backgroundColor: "#06883E"} }}
                          onClick={handleSubmit}
                        >
                          {t("candidature.soumettre")}
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          endIcon={<NextIcon />}
                          sx={{ backgroundColor: "#06883E", "&:hover": {backgroundColor: "#06883E"} }}
                        >
                          {t("candidature.suivant")}
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </form>
              )}
            </Container>
          </Grid>
        </Grid>
      ) : !!response ? (
        <Container maxWidth="sm" sx={{ my: "auto" }}>
          <Stack spacing={{ xs: 2, sm: 4 }}>
            <Typography textAlign="center" variant="subtitle1" sx={{color: "#06883E"}}>
              {t("candidature.prix_chef_etat_edition")}
            </Typography>
            <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center">
              {response.status && (
                <SuccessCheckIcon sx={{ width: 68, height: 68, color: "#06883E" }} />
              )}
              <Typography variant="h6">Inscrit avec succès</Typography>
              <Typography variant="subtitle1">{response.msg}</Typography>
            </Stack>
            <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center">
              <Typography variant="subtitle1">{t("candidature.code_candidature")}</Typography>
              <Typography variant="h5" sx={{color: "#06883E"}}>
                {response.numero_candidature}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      ) : null}
      {verifyDialog.value && (
        <CodeVerifyDialog
          open={verifyDialog.value}
          handleClose={verifyDialog.onFalse}
        />
      )}
    </>
  );
}

export default MultiStepForm;
