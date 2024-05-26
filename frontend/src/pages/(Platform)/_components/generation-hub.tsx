import { Link } from "react-router-dom";

type GenerationHubProps = {
  onSubmit: () => void;
  body?: React.ReactElement;
  imageUrl?: HTMLImageElement | null;
  isLoading: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export const GenerationHub = ({
  onSubmit,
  body,
  isLoading,
  canvasRef,
}: GenerationHubProps) => {
  return (
    <div className="flex">
      <form
        className="relative flex flex-col gap-5 items-center justify-center w-full md:w-[45%] min-h-screen"
        onSubmit={onSubmit}
      >
        <Link
          to="/"
          className="absolute top-2 border-b-2 pb-2 w-full text-2xl flex items-center justify-center"
        >
          Music & <span className="text-blue-500 pl-1">Art</span>
        </Link>
        <div className="w-full max-w-[500px] px-4">{body}</div>
      </form>
      <div className="bg-[#F9F5F0] hidden md:flex flex-1 items-center justify-center min-h-screen">
        <div className="bg-white border-8 border-black p-5 w-[350px] h-[500px]">
          <div className="border-2 h-full border-black bg-white">
            {isLoading ? (
              <img
                src="/images/loading.png"
                alt="loading"
                width={512}
                height={768}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            ) : (
              <canvas
                ref={canvasRef}
                width={512}
                height={768}
                className="border-2 relative w-full h-full object-cover object-center"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
