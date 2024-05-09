import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="flex items-center justify-between flex-col md:flex-row gap-10 px-4 py-20">
      <div className="flex flex-col space-y-10 text-center md:text-left md:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          Create yourself the most memorable art
        </h1>
        <p className="text-md sm:text-xl">
          Interieurproducten die onlosmakelijk verbonden zijn met jouw unieke
          muzieksmaak!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-5 sm:space-y-0 sm:space-x-20">
          <Link
            to="/shop"
            className="w-full text-center py-3 rounded-full bg-black hover:bg-black/85 transition-colors duration-300 text-white"
          >
            Start now
          </Link>
          <Link
            to="/blog"
            className="w-full flex items-center justify-center group border rounded-full py-3"
          >
            Learn more
            {window.innerWidth > 700 && (
              <GoArrowRight
                className="ml-2 mt-0.5 group-hover:translate-x-2 transition-transform duration-300"
                size={20}
              />
            )}
          </Link>
        </div>
      </div>
      <div>
        <img
          src="/images/img1.png"
          alt="image 1"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
};
