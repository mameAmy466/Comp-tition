import { forwardRef } from "react";
import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

const FadeTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export default FadeTransition;
