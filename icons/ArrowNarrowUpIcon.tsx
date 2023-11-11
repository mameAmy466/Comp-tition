import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

function ArrowNarrowUpIcon(props: SvgIconProps) {
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
          d="M12 20V4M12 4L6 10M12 4L18 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
export default ArrowNarrowUpIcon;
