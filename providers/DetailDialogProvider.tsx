import { ReactNode, createContext, useState } from "react";

import AlbumDetailDialog from "@/components/details/AlbumDetailDialog";
import ArticleDetailDialog from "@/components/details/ArticleDetailDialog";
import LiveEventDialog from "@/components/details/LiveEventDialog";
import VideoPlayerDialog from "@/components/details/VideoPlayerDialog";
import { useBoolean } from "@/hooks/useBoolean";
import { useRouter } from "next/router";
import CandidateFormDialog from "@/components/candidate/CandidateFormDialog";

interface IDetailDialogContext {
  showDialog: (dialogType: string, slug: string, section: string, type?: string) => void;
}
export const DetailDialogContext = createContext<IDetailDialogContext>({
  showDialog: () => {},
});

export default function DetailDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const hash = router.asPath.split("#")[1] || "";
  const [section, dialogType, slug] = hash.split("/");
  const dialog = useBoolean(!!section && !!dialogType && !!slug);
  //   const [dialogType, setDialogType] = useState("");
  //   const [slug, setSlug] = useState("");
  //   const [section, setSection] = useState("");

  const handleClose = () => {
    router.push({ hash: "" });
    dialog.onFalse();
  };

  return (
    <DetailDialogContext.Provider
      value={{
        showDialog: (type, sl, pageSection = "activity") => {
          //   setDialogType(type);
          //   setSlug(sl);
          //   setSection(section);
          router.push({ hash: `${pageSection}/${type}/${sl}` });
          dialog.onToggle();
        },
      }}
    >
      {dialog.value && dialogType === "text" && (
        <>
          {section === "activity" ? (
            <ArticleDetailDialog
              open={dialog.value}
              handleClose={handleClose}
              slug={`/actualites/details/${slug}`}
            />
          ) : section === "presentation" ? (
              // Si section est égale à "partenaire"
              <ArticleDetailDialog
                  type='presentation'
                  open={dialog.value}
                  handleClose={handleClose}
                  slug={`/pages/details/guide/${slug}`}
              />
          ) : (
            <ArticleDetailDialog
              open={dialog.value}
              handleClose={handleClose}
              slug={`/pages/details/guide/${slug}`}
            />
          )}
        </>
      )}

      {dialog.value && dialogType === "album" && (
        <AlbumDetailDialog
          open={dialog.value}
          handleClose={handleClose}
          slug={`/actualites/details/${slug}`}
        />
      )}

      {dialog.value && dialogType === "video" && (
        <VideoPlayerDialog
          open={dialog.value}
          handleClose={handleClose}
          slug={`/actualites/details/${slug}`}
        />
      )}

      {dialog.value && dialogType === "live" && (
        <LiveEventDialog
          open={dialog.value}
          handleClose={handleClose}
          slug={`/actualites/details/${slug}`}
        />
      )}
      {dialog.value && dialogType === "form" && (
        <CandidateFormDialog open={dialog.value} handleClose={handleClose} />
      )}
      {children}
    </DetailDialogContext.Provider>
  );
}
