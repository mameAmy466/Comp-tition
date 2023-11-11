import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { SWRConfig } from "swr";

import "@/styles/globals.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import fetcher from "@/utils/fetcher";

function App({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                fetcher,
                revalidateOnFocus: false,
            }}
        >
            <Component {...pageProps} />
        </SWRConfig>
    );
}
export default appWithTranslation(App);
