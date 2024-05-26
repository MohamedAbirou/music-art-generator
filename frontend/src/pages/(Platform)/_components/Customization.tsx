import { fonts } from "@/constants/fonts";
import { hexToRgb } from "@/utils/utils";
import { useState, useEffect, useCallback } from "react";
import { STEPS } from "../dashboard";
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
}: CustomizationProps) => {
  const [rotation, setRotation] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(50);
  const [transparency, setTransparency] = useState<number>(0.5);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(60);
  const [letterSpacing, setLetterSpacing] = useState<number>(0);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [fontFamily, setFontFamily] = useState<string>("sans serif");
  const [randomX, setRandomX] = useState(0);
  const [randomY, setRandomY] = useState(0);

  useEffect(() => {
    switch (mood) {
      case "Happy":
        setFontFamily("Sansita Swashed");
        break;
      case "Exuberant":
        setFontFamily("BioRhyme");
        break;
      case "Energetic":
        setFontFamily("Dancing Script");
        break;
      case "Frantic":
        setFontFamily("Merienda");
        break;
      case "Anxious":
        setFontFamily("Sixtyfour");
        break;
      case "Sad":
        setFontFamily("Sixtyfour");
        break;
      case "Depression":
        setFontFamily("Alkatra");
        break;
      case "Calm":
        setFontFamily("Madimi one");
        break;
      case "Contentment":
        setFontFamily("Orbitron");
        break;

      default:
        setFontFamily("Arial");
        break;
    }
  }, [mood]);

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
    setRotation(Math.floor(Math.random() * 21) - 10);
  }, [image]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = parseInt(e.target.value);
    setFontSize(newFontSize);

    // Set the line height to be 1.2 times the font size
    const newLineHeight = newFontSize * 1.2;
    setLineHeight(newLineHeight);
  };

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (image) {
        setTextColor(e.target.value);
      }
    },
    [image]
  );

  const handleStyleChange = useCallback(() => {
    // Update the canvas style immediately
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !image) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Draw the image as background
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

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
  }, [
    canvasRef,
    image,
    randomX,
    translateX,
    randomY,
    translateY,
    rotation,
    fontSize,
    fontFamily,
    textColor,
    transparency,
    letterSpacing,
    lyrics,
    lineHeight,
  ]);

  useEffect(() => {
    handleStyleChange();
  }, [handleStyleChange]);

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
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
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
            value={fontSize}
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
            value={transparency}
            onChange={(e) => setTransparency(parseFloat(e.target.value))}
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
            value={translateX}
            onChange={(e) => setTranslateX(parseFloat(e.target.value))}
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
            value={translateY}
            onChange={(e) => setTranslateY(parseFloat(e.target.value))}
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
            value={lineHeight}
            onChange={(e) => setLineHeight(parseFloat(e.target.value))}
            onBlur={handleStyleChange}
          />
        </label>
        <label htmlFor="letterSpacing" className="text-gray-700 text-md flex-1">
          Letter Spacing
          <input
            id="letterSpacing"
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            type="number"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
            onBlur={handleStyleChange}
          />
        </label>
        <label className="text-gray-700 text-md flex-1">
          Font Family
          <select
            name="fontFamily"
            value={fontFamily}
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            onBlur={handleStyleChange}
            onChange={(e) => setFontFamily(e.target.value)}
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
            value={textColor}
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
