import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Accept, useDropzone } from "react-dropzone";

import QualityImage from "./QualityImage";

function FileDragDrop({
  id,
  name,
  accept,
  required,
  onChange,
}: {
  id: string;
  name: string;
  accept?: Accept;
  required?: boolean;
  onChange: (f: File) => void;
}) {
  const [file, setFile] = useState<File>();
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: accept ??  {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      onChange(acceptedFiles[0]);
    },
  });

  return (
    <Stack spacing={2} direction="row">
      <Box
        {...getRootProps({ className: "dropzone" })}
        sx={{
          px: 2,
          //   py: 1,
          minHeight: { xs: 40, sm: 60 },
          display: "flex",
          flexDirection: "row",
          borderStyle: "dashed",
          borderRadius: 1,
          borderColor: "#C3C3C3",
          borderWidth: "1.5px",
          color: "#C3C3C3",
        }}
      >
        <input {...getInputProps()} id={id} name={name} required={required} />
        <Typography variant="caption" sx={{ my: "auto" }}>
          Importer une photo d’identité depuis votre device
        </Typography>
      </Box>
        {file && file.type.startsWith('image/') ? (
            <Box sx={{ width: { xs: 40, sm: 60 } }}>
                <QualityImage
                    alt="candiate_logo"
                    src={URL.createObjectURL(file)}
                    aspectRatio={1}
                />
            </Box>
        ) :
            file ? file.name : ''}
    </Stack>
  );
}

export default FileDragDrop;
