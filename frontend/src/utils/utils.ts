export const hexToRgb = (hex: string): string => {
  // Remove '#' from the beginning, if present
  hex = hex?.replace(/^#/, "");

  // Parse the hex values to separate RGB values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB values as a string
  return `${r}, ${g}, ${b}`;
};

export const downloadImg = (image: string) => {
  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(image as unknown as Blob);
  downloadLink.download = image;

  // Trigger the download
  downloadLink.click();

  // Clean up the URL.createObjectURL
  URL.revokeObjectURL(downloadLink.href);
};
