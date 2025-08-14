"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { HeroSlideType } from "./Hero";

// as a fallback if the images not uploaded

const defaultSlides: HeroSlideType[] = [
  {
    _id: "1",
    title: "Welcome to Our Store",
    subTitle: "Find the best fashion trends here",
    imageUrl: "https://picsum.photos/id/1018/1920/1080",
  },

  {
    _id: "2",
    title: "Exclusive Offers",
    subTitle: "Grab your deals before they expire",
    imageUrl: "https://picsum.photos/id/1015/1920/1080",
  },

  {
    _id: "3",
    title: "New Arrivals",
    subTitle: "Fresh styles for every season",
    imageUrl: "https://picsum.photos/id/1016/1920/1080",
  },
];

export default function HeroSlides({ slides }: { slides: HeroSlideType[] }) {
  let finalSlides: HeroSlideType[] = [];
  if (slides.length > 0) {
    if (slides.length > 2) {
      // if slides are more than 2 so use the slides on
      finalSlides = slides;
    } else {
      // if slides are less than 2 so combile slides and default slides and make 3 length
      finalSlides = [...slides, ...defaultSlides].slice(0, 3);
    }
  } else {
    // if there is no slide so use the default slides
    finalSlides = defaultSlides;
  }

  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        allowTouchMove={false}
        autoplay={{
          delay: 1300, // 3 seconds
          disableOnInteraction: false,
        }}
        // className="h-full"
      >
        {finalSlides.map((slide: HeroSlideType) => (
          <SwiperSlide key={slide._id}>
            <div
              className="relative w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              {/* Overlay */}
              {/* inset = left-0 top-0 right-0 bottom-0 */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text */}
              <div className="absolute inset-0 flex flex-col gap-6 items-center pt-[30vh] text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl">{slide.subTitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
