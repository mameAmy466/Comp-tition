import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

function NextIcon(props: SvgIconProps) {
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
          d="M9 18L15 12L9 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default NextIcon;
