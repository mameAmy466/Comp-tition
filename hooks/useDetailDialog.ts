import { useContext } from "react";

import { DetailDialogContext } from "@/providers/DetailDialogProvider";

const useDetailDialog = () => useContext(DetailDialogContext);
export default useDetailDialog;
