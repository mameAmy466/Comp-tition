import React from "react";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import useSWR from "swr";

import MultiStepForm from "@/components/candidate/MultiStepForm";
import CloseIcon from "@/icons/CloseIcon";
import FadeTransition from "@/components/FadeTransition";
import { ICandidateForm } from "@/types";
import LoadingScreen from "../LoadingScreen";

interface CandidateFormDialogProps {
  open: boolean;
  handleClose: VoidFunction;
}
function CandidateFormDialog({ open, handleClose }: CandidateFormDialogProps) {
  const { locale } = useRouter();
  const { data, isLoading } = useSWR<ICandidateForm[]>(
    `/candidatures/form?langue=${locale}`
    // `/candidatures/form`
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      // PaperProps={{
      //   sx: {
      //     backgroundColor: '#0A2752',
      //     backgroundImage: 'url(/apropos/bg1.png)',
      //     backgroundRepeat: 'no-repeat',
      //     backgroundPosition: 'center',
      //     backgroundSize: 'cover',
      //   },
      // }}
      TransitionComponent={FadeTransition}
    >
      {isLoading && <LoadingScreen sx={{ color: "black" }} />}
      {!!data && <MultiStepForm steps={data} />}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: "16px",
          right: "16px",
          // color: { xs: "white", md: "black" },
          color: "black",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default CandidateFormDialog;
