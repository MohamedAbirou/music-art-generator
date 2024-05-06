import { testimonials } from "@/utils/testimonials";
import { TestimCard } from "./testim-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const Testimonials = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="w-full max-w-full py-20 space-y-32"
    >
      <div>
        <div className="flex items-center text-center flex-col gap-y-5 lg:gap-y-0 text-xl">
          <p>Ready to turn your favorite tunes into unforgettable art?</p>
          <p>Let's bring your music to life, one image at a time.</p>
        </div>
        <div className="relative flex items-center mt-20 justify-center lg:justify-between flex-col lg:flex-row gap-y-24 lg:gap-y-0 gap-x-10 overflow-hidden">
          <div className="flex flex-col gap-y-5 lg:ml-40 w-full">
            <p className="text-4xl md:text-5xl lg:text-6xl text-center lg:text-left tracking-wide">
              What our customers say about us
            </p>
            <div className="sticky w-[50px] mx-auto lg:ml-12 mt-10 flex items-center">
              <CarouselNext className="w-12 h-12" />
              <CarouselPrevious className="w-12 h-12" />
            </div>
          </div>

          <div className="w-full max-w-[27rem] lg:max-w-2xl gap-x-10">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-auto lg:basis-9/12">
                  <TestimCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </div>
      </div>
    </Carousel>
  );
};
