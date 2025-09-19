import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

type Slide = {
  id: number;
  color: string;
  img: string;
  title?: string;
};

const slides: Slide[] = [
  { id: 1, color: "bg-blue-300", img: "/images/slide1.jpg", title: "Slide 1" },
  { id: 2, color: "bg-green-300", img: "/images/slide2.jpg", title: "Slide 2" },
  { id: 3, color: "bg-red-300", img: "/images/slide3.jpg", title: "Slide 3" },
  { id: 4, color: "bg-yellow-300", img: "/images/slide4.jpg", title: "Slide 4" },
  { id: 5, color: "bg-purple-300", img: "/images/slide5.jpg", title: "Slide 5" },
  { id: 6, color: "bg-pink-300", img: "/images/slide6.jpg", title: "Slide 6" },
  { id: 7, color: "bg-indigo-300", img: "/images/slide7.jpg", title: "Slide 7" },
  { id: 8, color: "bg-teal-300", img: "/images/slide8.jpg", title: "Slide 8" },
  { id: 9, color: "bg-orange-300", img: "/images/slide9.jpg", title: "Slide 9" },
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
