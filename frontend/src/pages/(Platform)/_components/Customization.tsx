import { fonts } from "@/constants/fonts";
import { hexToRgb } from "@/utils/utils";
import { useState, useEffect, useCallback } from "react";
import { CanvasOptions, STEPS } from "../dashboard";
import ProgressBar from "./progress-bar";
import { LucideIcon } from "lucide-react";

interface CustomizationProps {
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: React.ReactElement<LucideIcon>;
  image: HTMLImageElement | null;
  mood: string | null;
  lyrics: string[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  step: STEPS;
  STEPS: typeof STEPS;
  options: CanvasOptions;
  setOptions: React.Dispatch<React.SetStateAction<CanvasOptions>>;
}

export const Customization = ({
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  image,
  mood,
  lyrics,
  canvasRef,
  step,
  STEPS,
  options,
  setOptions,
}: CustomizationProps) => {
  const [randomX, setRandomX] = useState(0);
  const [randomY, setRandomY] = useState(0);

  useEffect(() => {
    switch (mood) {
      case "Happy":
        setOptions((prev) => ({ ...prev, fontFamily: "Sansita Swashed" }));
        break;
      case "Exuberant":
        setOptions((prev) => ({ ...prev, fontFamily: "BioRhyme" }));
        break;
      case "Energetic":
        setOptions((prev) => ({ ...prev, fontFamily: "Dancing Script" }));
        break;
      case "Frantic":
        setOptions((prev) => ({ ...prev, fontFamily: "Merienda" }));
        break;
      case "Anxious":
        setOptions((prev) => ({ ...prev, fontFamily: "Sixtyfour" }));
        break;
      case "Sad":
        setOptions((prev) => ({ ...prev, fontFamily: "Sixtyfour" }));
        break;
      case "Depression":
        setOptions((prev) => ({ ...prev, fontFamily: "Alkatra" }));
        break;
      case "Calm":
        setOptions((prev) => ({ ...prev, fontFamily: "Madimi one" }));
        break;
      case "Contentment":
        setOptions((prev) => ({ ...prev, fontFamily: "Orbitron" }));
        break;
      case "Power":
        setOptions((prev) => ({ ...prev, fontFamily: "Anton" }));
        break;
      default:
        setOptions((prev) => ({ ...prev, fontFamily: "Arial" }));
        break;
    }
  }, [mood, setOptions]);

  useEffect(() => {
    // Only update the random positions when the image changes
    if (image) {
      const canvas = canvasRef.current;
      if (canvas) {
        setRandomX(Math.random() * (canvas.width - 100) + 50);
        setRandomY(Math.random() * (canvas.height - 100) + 50);
      }
    }
  }, [canvasRef, image]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      rotation: Math.floor(Math.random() * 21) - 10,
    }));
  }, [image, setOptions]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = parseInt(e.target.value);
    setOptions((prev) => ({
      ...prev,
      fontSize: newFontSize,
    }));

    // Set the line height to be 1.2 times the font size
    const newLineHeight = newFontSize * 1.2;
    setOptions((prev) => ({
      ...prev,
      lineHeight: newLineHeight,
    }));
  };

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (image) {
        setOptions((prev) => ({
          ...prev,
          textColor: e.target.value,
        }));
      }
    },
    [image, setOptions]
  );

  const handleStyleChange = useCallback(() => {
    if (!canvasRef.current || !image) return;

    // Update the canvas style immediately
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Draw the image as background
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const {
      rotation,
      fontSize,
      transparency,
      translateX,
      translateY,
      lineHeight,
      letterSpacing,
      textColor,
      fontFamily,
    } = options;

    // Add the user's translation values
    const finalX = randomX + translateX;
    const finalY = randomY + translateY;

    ctx.translate(finalX, finalY);

    ctx.rotate((rotation * Math.PI) / 180);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = `rgba(${hexToRgb(textColor)}, ${transparency})`;
    ctx.textAlign = "center";
    ctx.letterSpacing = `${letterSpacing}px`;

    // eslint-disable-next-line prefer-const
    let lines = lyrics
      ?.reduce((acc: string[][], word: string, i: number) => {
        if (i % 3 === 0) acc.push([]);
        acc[acc.length - 1].push(word);
        return acc;
      }, [])
      .map((line) => line.join(" ").replace(/"/g, ""));

    lines?.forEach((line, index) => {
      ctx.fillText(line, 0, index * lineHeight);
    });

    ctx.restore();
  }, [canvasRef, image, options, randomX, randomY, lyrics]);

  useEffect(() => {
    handleStyleChange();
  }, [handleStyleChange, options, step]);

  return (
    <>
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl pb-3">Customize</h2>
      </div>
      <div
        className="my-10 grid grid-cols-2 gap-5"
        style={{ fontFamily: "Athletics" }}
      >
        <label htmlFor="rotation" className="text-gray-700 text-md flex-1">
          Rotation
          <input
            id="rotation"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="range"
            min="-10"
            max="10"
            value={options.rotation}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                rotation: parseInt(e.target.value),
              }))
            }
            onBlur={handleStyleChange}
          />
        </label>
        <label htmlFor="fontSize" className="text-gray-700 text-md flex-1">
          Font Size
          <input
            id="fontSize"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="number"
            min="1"
            value={options.fontSize}
            onChange={handleFontSizeChange}
            onBlur={handleStyleChange}
          />
        </label>
        <label htmlFor="transparency" className="text-gray-700 text-md flex-1">
          Transparency
          <input
            id="transparency"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={options.transparency}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                transparency: parseFloat(e.target.value),
              }))
            }
            onBlur={handleStyleChange}
          />
        </label>
        <label htmlFor="translateX" className="text-gray-700 text-md flex-1">
          Translate on X Axis
          <input
            id="translateX"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="number"
            step="1"
            value={options.translateX}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                translateX: parseInt(e.target.value),
              }))
            }
            onBlur={handleStyleChange}
          />
        </label>
        <label htmlFor="translateY" className="text-gray-700 text-md flex-1">
          Translate on Y Axis
          <input
            id="translateY"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="number"
            step="1"
            value={options.translateY}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                translateY: parseInt(e.target.value),
              }))
            }
            onBlur={handleStyleChange}
          />
        </label>
        <label htmlFor="lineHeight" className="text-gray-700 text-md flex-1">
          Line Height
          <input
            id="lineHeight"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="number"
            step="5"
            value={options.lineHeight}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                lineHeight: parseInt(e.target.value),
              }))
            }
            onBlur={handleStyleChange}
          />
        </label>
        <label htmlFor="letterSpacing" className="text-gray-700 text-md flex-1">
          Letter Spacing
          <input
            id="letterSpacing"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="number"
            value={options.letterSpacing}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                letterSpacing: parseInt(e.target.value),
              }))
            }
            onBlur={handleStyleChange}
          />
        </label>
        <label className="text-gray-700 text-md flex-1">
          Font Family
          <select
            name="fontFamily"
            value={options.fontFamily}
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            onBlur={handleStyleChange}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                fontFamily: e.target.value,
              }))
            }
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="color" className="text-gray-700 text-md flex-1">
          <input
            type="color"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            value={options.textColor}
            onChange={handleColorChange}
            onBlur={handleStyleChange}
          />
        </label>
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
                "bg-black text-white px-7 py-2 mt-4 hover:bg-black/90 transition-colors duration-300 rounded-full"
              }`}
              style={{ fontFamily: "Athletics" }}
            >
              {secondaryActionLabel}
            </button>
            <button
              type="submit"
              className="bg-black text-white px-7 py-2 mt-4 hover:bg-black/90 transition-colors duration-300 rounded-full"
              style={{ fontFamily: "Athletics" }}
              disabled={disabled}
            >
              {disabled ? "Generating..." : actionLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
