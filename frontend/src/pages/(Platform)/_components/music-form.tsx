import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

interface MusicFormProps {
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  artistValue: string;
  songValue: string;
  colorValue: string;
  setValue: (id: string, value: string) => void;
}

export const MusicForm = ({
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  register,
  errors,
  artistValue,
  songValue,
  colorValue,
  setValue,
}: MusicFormProps) => {
  return (
    <>
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl pb-3">Generate your art</h2>
      </div>
      <div
        className="my-10 flex flex-col gap-y-5"
        style={{ fontFamily: "Athletics" }}
      >
        <label htmlFor="artist" className="text-gray-700 text-md flex-1">
          Enter the name of the artist
          <input
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            value={artistValue}
            type="text"
            id="artist"
            {...register("artist", {
              required: "This field is required",
              onChange: (e) => setValue("artist", e.target.value),
            })}
          />
          {errors.artist && (
            <span className="text-red-500">{errors.root?.message}</span>
          )}
        </label>
        <label htmlFor="song" className="text-gray-700 text-md flex-1">
          Enter the title of the song
          <input
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            value={songValue}
            type="text"
            id="song"
            {...register("song", {
              required: "This field is required",
              onChange: (e) => setValue("song", e.target.value),
            })}
          />
          {errors.song && (
            <span className="text-red-500">{errors.root?.message}</span>
          )}
        </label>
        <label htmlFor="color" className="text-gray-700 text-md flex-1">
          Choose the color for the artwork
          <input
            className="border rounded w-full my-2 py-1 px-2 font-normal"
            value={colorValue}
            type="color"
            id="color"
            {...register("color", {
              required: "This field is required",
              onChange: (e) => setValue("color", e.target.value),
            })}
          />
          {errors.color && (
            <span className="text-red-500">{errors.root?.message}</span>
          )}
        </label>
      </div>

      <div className="flex justify-center">
        <div className="w-full absolute bottom-4">
          <hr />
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
