import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import FadeTransition from "../FadeTransition";
import CloseIcon from "@/icons/CloseIcon";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import useSWR from "swr";
import parse from "html-react-parser";

import { IArticleDetail } from "@/types";
import LoadingScreen from "../LoadingScreen";
import QualityImage from "../QualityImage";

interface ArticleDetailDialogProps {
  type?: string;
  open: boolean;
  handleClose: VoidFunction;
  slug: string;
}
function ArticleDetailDialog({
  type,
  open,
  handleClose,
  slug,
}: ArticleDetailDialogProps) {
  const { data, isLoading } = useSWR<{ result: IArticleDetail }>(slug);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      // PaperProps={{
      //   sx: {
      //     backgroundColor: '#0A2752',
      //     backgroundImage: 'url(/apropos/bg1.png)',
      //     backgroundRepeat: 'no-repeat'a,
      //     backgroundPosition: 'center',
      //     backgroundSize: 'cover',
      //   },
      // }}
      TransitionComponent={FadeTransition}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 8, sm: 10 } }}>
        {isLoading && <LoadingScreen sx={{ color: "black" }} />}
        {!!data && (
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            {!!data.result.image && (
              <Grid xs={12} sm={6}>
                <Box>
                  <QualityImage
                    src={data.result.image}
                    alt={data.result.title}
                  />
                  <Typography sx={{ mt: 2 }}>
                    Publié par
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {" "}
                      {data.result.title}
                    </Typography>
                  </Typography>
                  <Typography>
                    Date de publication{" "}
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {data.result.publish_at}
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid xs={12} {...(!!data.result.image ? { sm: 6 } : {})}>
              {!data.result.image && (
                <>
                  {type && type !== 'presentation' && (
                      <>
                        <Typography sx={{ mt: 2 }}>
                          Publié par
                          <Typography component="span" sx={{ fontWeight: 600 }}>
                            {" "}
                            {data.result.title}
                          </Typography>
                        </Typography>
                        <Typography>
                          Date de publication{" "}
                          <Typography component="span" sx={{ fontWeight: 600 }}>
                            {data.result.publish_at}
                          </Typography>
                        </Typography>
                      </>
                  )}
                </>
              )}
              {parse(data.result.content)}
            </Grid>
          </Grid>
        )}
      </Container>

      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: "16px",
          right: "16px",
          color: "black",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default ArticleDetailDialog;
