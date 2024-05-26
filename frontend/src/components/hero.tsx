import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="flex items-center justify-between flex-col-reverse md:flex-row gap-10 px-4 py-20">
      <div className="flex flex-col space-y-10 text-center md:text-left md:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          Create yourself the most memorable art
        </h1>
        <p className="text-md sm:text-xl" style={{ fontFamily: "Athletics" }}>
          Interieurproducten die onlosmakelijk verbonden zijn met jouw unieke
          muzieksmaak!
        </p>
        <div className="w-full lg:w-3/4 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-5 sm:space-y-0 sm:space-x-20 md:space-x-0">
          <Link
            to="/generate"
            className="w-full lg:w-6/12 text-center py-4 rounded-full bg-black hover:bg-black/85 transition-colors duration-300 text-white"
          >
            Start now
          </Link>
          <Link
            to="/blog"
            className="w-full flex items-center justify-center group border md:border-none rounded-full py-4"
          >
            Learn more
            {window.innerWidth > 700 && (
              <GoArrowRight
                className="ml-2 md:ml-1 lg:ml-2 mt-0.5 group-hover:translate-x-2 transition-transform duration-300"
                size={20}
              />
            )}
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="/images/img1.png"
          alt="image 1"
          className="w-5/6 md:w-full object-contain object-center"
        />
      </div>
    </div>
  );
};
