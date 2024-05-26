"use client";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "@/api-client";
import { GenerationHub } from "./_components/generation-hub";
import { MusicForm } from "./_components/music-form";
import { Customization } from "./_components/Customization";
import { Finalize } from "./_components/Finalize";
import { CanvasOptions } from "@/hooks/useCanvas";

enum STEPS {
  GENERATION = 0,
  CUSTOMIZATION = 1,
  FINALIZE = 2,
}

const DashboardPage = () => {
  const [step, setStep] = useState(STEPS.GENERATION);
  const [generatedImage, setGeneratedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [mood, setMood] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [options] = useState<CanvasOptions>({
    rotation: 0,
    fontSize: 50,
    transparency: 0.5,
    translateX: 0,
    translateY: 0,
    lineHeight: 60,
    letterSpacing: 0,
    textColor: "#ffffff",
    fontFamily: "sans serif",
    lyrics: [],
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      artist: "",
      song: "",
      color: "#000000",
    },
  });

  const artist = watch("artist");
  const song = watch("song");
  const color = watch("color");

  useEffect(() => {
    const savedArtist = localStorage.getItem("artist");
    const savedSong = localStorage.getItem("song");
    const savedColor = localStorage.getItem("color");
    const savedImageUrl = localStorage.getItem("imageUrl");

    if (savedArtist) setValue("artist", savedArtist);
    if (savedSong) setValue("song", savedSong);
    if (savedColor) setValue("color", savedColor);
    if (savedImageUrl) {
      const newImage = new window.Image();
      newImage.src = savedImageUrl;
      newImage.onload = () => setGeneratedImage(newImage);
    }
  }, [setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    localStorage.setItem(id, value);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const { mutate, isLoading } = useMutation(apiClient.generateImage, {
    onSuccess: (data) => {
      toast.success("Image generated!");
      const newImage = new window.Image();
      newImage.onload = () => setGeneratedImage(newImage);
      newImage.src = data.imageUrl;

      localStorage.setItem("imageUrl", data.imageUrl);
      localStorage.setItem("mood", data.mood);
      localStorage.setItem("lyrics", JSON.stringify(data.keywords));

      setMood(data.mood);
      setLyrics(data.keywords);
      setStep(STEPS.CUSTOMIZATION);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (step === STEPS.GENERATION) {
      mutate(data);
    } else if (step === STEPS.CUSTOMIZATION) {
      onNext();
    } else if (step === STEPS.FINALIZE) {
      console.log("Finalize data", data);
      localStorage.clear();
    }
  });

  const actionLabel = useMemo(() => {
    if (step === STEPS.FINALIZE) {
      return "Add to basket";
    }

    if (step === STEPS.CUSTOMIZATION) {
      return "Next";
    }
    return "Generate the magic";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.GENERATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent;

  if (step === STEPS.GENERATION) {
    bodyContent = (
      <div>
        <MusicForm
          actionLabel={actionLabel}
          disabled={isLoading}
          secondaryAction={step === STEPS.GENERATION ? undefined : onBack}
          secondaryActionLabel={secondaryActionLabel}
          register={register}
          errors={errors}
          artistValue={artist}
          songValue={song}
          colorValue={color}
          setValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.CUSTOMIZATION) {
    bodyContent = (
      <div>
        <Customization
          actionLabel={actionLabel}
          disabled={isLoading}
          secondaryAction={onBack}
          secondaryActionLabel={secondaryActionLabel}
          image={generatedImage}
          mood={mood}
          lyrics={lyrics}
          canvasRef={canvasRef}
        />
      </div>
    );
  }

  if (step === STEPS.FINALIZE) {
    bodyContent = (
      <Finalize
        actionLabel={actionLabel}
        secondaryAction={onBack}
        secondaryActionLabel={secondaryActionLabel}
        canvasRef={canvasRef}
        artistValue={artist}
        songValue={song}
        colorValue={color}
        image={generatedImage}
        options={options}
      />
    );
  }

  return (
    <GenerationHub
      onSubmit={onSubmit}
      body={bodyContent}
      imageUrl={generatedImage}
      isLoading={isLoading}
      canvasRef={canvasRef}
    />
  );
};

export default DashboardPage;
