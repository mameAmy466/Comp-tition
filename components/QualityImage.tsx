import Image from "next/image";
import Box from "@mui/material/Box";

type Props = {
  src: string;
  alt: string;
  aspectRatio?: number;
};

function QualityImage({ src, alt, aspectRatio = 16 / 9 }: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio,
        objectFit: "contain",
      }}
    >
      <Image fill alt={alt} src={src} />
    </Box>
  );
}

export default QualityImage;
