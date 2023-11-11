import { useState } from "react";
import { Swiper, SwiperProps } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import Box from "@mui/material/Box";

type CustomSwiperProps = SwiperProps & {
  thumb?: boolean;
};

function CustomSwiper({
  children,
  thumb = false,
  ...others
}: CustomSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        freeMode={true}
        navigation={true}
        {...others}
        {...(thumb
          ? {
              modules: [FreeMode, Navigation, Thumbs],
              thumbs: {
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              },
            }
          : { modules: [FreeMode, Navigation] })}
      >
        {children}
      </Swiper>

      {thumb && (
        <Box sx={{ mt: 2 }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              640: {
                centeredSlides: false,
                slidesPerView: 4,
                // spaceBetween: 30,
              },
              1024: {
                centeredSlides: false,
                slidesPerView: 5,
                // spaceBetween: 50,
              },
            }}
            freeMode={true}
            navigation={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {children}
          </Swiper>
        </Box>
      )}
    </>
  );
}

export default CustomSwiper;
