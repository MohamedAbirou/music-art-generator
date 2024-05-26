import { useEffect, RefObject } from "react";
import { hexToRgb } from "@/utils/utils";

export interface CanvasOptions {
  rotation: number;
  fontSize: number;
  transparency: number;
  translateX: number;
  translateY: number;
  lineHeight: number;
  letterSpacing: number;
  textColor: string;
  fontFamily: string;
  lyrics: string[];
}

const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  image: HTMLImageElement | null,
  options: CanvasOptions
) => {
  useEffect(() => {
    const handleStyleChange = () => {
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
        lyrics,
      } = options;

      const canvas = canvasRef.current;
      if (!canvas || !image) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const finalX = translateX;
      const finalY = translateY;

      ctx.translate(finalX, finalY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = `rgba(${hexToRgb(textColor)}, ${transparency})`;
      ctx.textAlign = "center";
      ctx.letterSpacing = `${letterSpacing}px`;

      const lines = lyrics
        .reduce((acc: string[][], word: string, i: number) => {
          if (i % 3 === 0) acc.push([]);
          acc[acc.length - 1].push(word);
          return acc;
        }, [])
        .map((line) => line.join(" ").replace(/"/g, ""));

      lines.forEach((line, index) => {
        ctx.fillText(line, 0, index * lineHeight);
      });

      ctx.restore();
    };

    handleStyleChange();
  }, [canvasRef, image, options]);
};

export default useCanvas;
