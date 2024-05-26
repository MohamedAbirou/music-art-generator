import namer from "color-namer";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { STEPS } from "../dashboard";
import ProgressBar from "./progress-bar";
import useCanvas, { CanvasOptions } from "@/hooks/useCanvas";

interface FinalizeProps {
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: React.ReactElement<LucideIcon>;
  artistValue: string;
  songValue: string;
  colorValue: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  step: STEPS;
  STEPS: typeof STEPS;
  image: HTMLImageElement | null;
  options: CanvasOptions;
}

export const Finalize = ({
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  artistValue,
  songValue,
  colorValue,
  canvasRef,
  step,
  STEPS,
  image,
  options,
}: FinalizeProps) => {
  const colorNames = namer(colorValue || "FFFFFF");
  const colorName = colorNames.basic[0].name;

  useCanvas(canvasRef, image, options);

  return (
    <>
      <div
        className="my-10 flex flex-col gap-y-5"
        style={{ fontFamily: "Athletics" }}
      >
        <div className="bg-white border-8 border-black p-5 w-[250px] h-[400px]">
          <div className="border-2 h-full border-black bg-white">
            <canvas
              ref={canvasRef}
              width={350}
              height={500}
              className="border-2 relative w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <p>{artistValue}</p>
        <p>{songValue}</p>
        <p>
          {colorValue} ({colorName})
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full absolute bottom-4">
          <ProgressBar
            currentStep={step}
            totalSteps={Object.keys(STEPS).length / 2}
          />
          <div className="flex items-center justify-between mx-3">
            <button
              onClick={secondaryAction}
              className={`${
                secondaryActionLabel &&
                "bg-black/10 text-[#2C2C2C] px-7 py-2 mt-4 hover:bg-black/15 transition-colors duration-300 rounded-full"
              }`}
              style={{ fontFamily: "Athletics" }}
            >
              {secondaryActionLabel}
            </button>
            <Link
              to="/cart"
              role="button"
              className="bg-black text-white px-7 py-2 mt-4 hover:bg-black/90 transition-colors duration-300 rounded-full"
              style={{ fontFamily: "Athletics" }}
            >
              {actionLabel}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
