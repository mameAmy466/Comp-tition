import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

function ExpandMoreIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9L12 15L18 9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default ExpandMoreIcon;
