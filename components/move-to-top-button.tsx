import IconButton from "@mui/material/IconButton";
import ArrowNarrowUpIcon from "@/icons/ArrowNarrowUpIcon";

function MoveToTopButton({ handleClick }: { handleClick: VoidFunction }) {
  return (
    <IconButton
      sx={{
        color: "white",
        backgroundColor: "#06883E",
        position: "absolute",
        right: { xs: 20, sm: 100 },
        bottom: { xs: 10, sm: 100 },
        zIndex: 500,
      }}
      onClick={handleClick}
    >
      <ArrowNarrowUpIcon />
    </IconButton>
  );
}

export default MoveToTopButton;
