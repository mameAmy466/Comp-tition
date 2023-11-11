import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

function CloseIcon(props: SvgIconProps) {
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
          d="M17 7L7 17M7 7L17 17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default CloseIcon;
