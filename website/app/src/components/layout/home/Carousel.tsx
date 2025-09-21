import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import anh1 from "../../../assets/carousel/anh1.jpg"
import anh2 from "../../../assets/carousel/anh2.jpg"
import anh3 from "../../../assets/carousel/anh3.jpg"
import anh4 from "../../../assets/carousel/anh4.png"
import anh5 from "../../../assets/carousel/anh5.jpg"
import anh6 from "../../../assets/carousel/anh6.png"
import anh7 from "../../../assets/carousel/anh7.jpg"
import anh8 from "../../../assets/carousel/anh8.jpg"
import anh9 from "../../../assets/carousel/anh9.jpg"

type Slide = {
  id: number;
  color: string;
  img: string;
  title?: string;
};

const slides: Slide[] = [
  { id: 1, color: "bg-blue-300", img: anh1, title: "Slide 1" },
  { id: 2, color: "bg-green-300", img: anh2, title: "Slide 2" },
  { id: 3, color: "bg-red-300", img: anh3, title: "Slide 3" },
  { id: 4, color: "bg-yellow-300", img: anh4, title: "Slide 4" },
  { id: 5, color: "bg-purple-300", img: anh5, title: "Slide 5" },
  { id: 6, color: "bg-pink-300", img: anh6, title: "Slide 6" },
  { id: 7, color: "bg-indigo-300", img: anh7, title: "Slide 7" },
  { id: 8, color: "bg-teal-300", img: anh8, title: "Slide 8" },
  { id: 9, color: "bg-orange-300", img: anh9, title: "Slide 9" },
];

export default function Carousel() {
  return (
    <Swiper
      pagination={{ clickable: true, dynamicBullets: true }}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 3000,          
        disableOnInteraction: false, 
      }}
      loop
      className="w-full max-w-5xl h-[300px] sm:h-[200px] md:h-[500px] rounded-xl overflow-hidden mx-auto"
    >
      {slides.map((slide) => (
        <SwiperSlide
          key={slide.id}
          className={`flex items-center justify-center h-full ${slide.color}`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
