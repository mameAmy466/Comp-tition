import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

function SuccessCheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        fill="none"
        width="76"
        height="76"
        viewBox="0 0 76 76"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="4" width="68" height="68" rx="34" fill="#D1FADF" />
        <path
          d="M53 37.12V38.5C52.9982 41.7347 51.9508 44.8821 50.014 47.4728C48.0773 50.0635 45.3549 51.9588 42.253 52.8759C39.1511 53.793 35.8359 53.6829 32.8017 52.5619C29.7675 51.4409 27.177 49.3692 25.4164 46.6556C23.6559 43.9421 22.8197 40.7321 23.0325 37.5045C23.2453 34.2769 24.4958 31.2045 26.5974 28.7457C28.699 26.2868 31.5392 24.5731 34.6943 23.8603C37.8494 23.1474 41.1504 23.4735 44.105 24.79M53 26.5L38 41.515L33.5 37.015"
          stroke="#039855"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="4"
          y="4"
          width="68"
          height="68"
          rx="34"
          stroke="#ECFDF3"
          strokeWidth="8"
        />
      </svg>
    </SvgIcon>
  );
}

export default SuccessCheckIcon;
