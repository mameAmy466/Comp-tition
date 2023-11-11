import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingScreen(props: BoxProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props,
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
}

export default LoadingScreen;
