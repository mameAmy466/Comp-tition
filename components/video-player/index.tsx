import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Props = {
  src: string;
};

function VideoPlayer({ src }: Props) {
  return (
    <Box sx={{ aspectRatio: 16 / 9, width: "100%" }}>
      <ReactPlayer
        url={src}
        width="100%"
        height="100%"
        loop={true}
        controls={true}
        className="absolute top-0 left-0"
      />
    </Box>
  );
}

export default VideoPlayer;
