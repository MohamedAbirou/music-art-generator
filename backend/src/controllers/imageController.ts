import { Request, Response } from "express";
import { validationResult } from "express-validator";
import namer from "color-namer";
import "dotenv/config";
import axios from "axios";

const apiKey = process.env.GEMINI_API_KEY;

// @desc Generate
// @route POST /images
// @access Public
const generate = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { artist, song, color } = req.body;

  const colorNames = namer(color || "FFFFFF");
  const colorName = colorNames.basic[0].name;

  if (!artist || !song || !color) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!apiKey) {
    return res
      .status(400)
      .json({ message: "GEMINI API key is not configured" });
  }

  try {
    const getMood = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `answer with a single word that is among these words [Happy, Exuberant, Energetic, Frantic, Anxious, Sad, Depression, Calm, Contentment, Power]: What's the mood of the song '${song}' by ${artist}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const mood = getMood.data.candidates[0].content?.parts[0]?.text;

    console.log("Mood:", mood);

    const getSongId = await axios.get(
      "https://spotify23.p.rapidapi.com/search/",
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
        params: {
          q: song,
          type: "tracks",
          limit: "10",
        },
      }
    );

    const songId = getSongId.data.tracks.items[0].data.id;

    console.log("Song ID:", songId);

    const getSongLyrics = await axios.get(
      "https://spotify23.p.rapidapi.com/track_lyrics/",
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
        params: {
          id: songId,
        },
      }
    );

    const lines = getSongLyrics.data.lyrics.lines.map(
      (line: any) => line.words
    );

    const lyrics = lines.join("\n");

    console.log("Lyrics:", lyrics);

    const songAnalysis = await axios.get(
      "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/",
      {
        params: {
          text: lyrics,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "twinword-sentiment-analysis.p.rapidapi.com",
        },
      }
    );

    const keywords = songAnalysis.data.keywords.map(
      (keyword: any) => keyword.word
    );

    const sentence = keywords.join(", ");

    console.log("Sentence:", sentence);

    const getLyrics = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `generate in one string a song lyrics sentence with 10 words max combining these words: ${sentence}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const lyricsList =
      getLyrics.data.candidates[0].content?.parts[0]?.text?.split(" ");

    console.log("Lyrics List:", lyricsList);

    const getImprovedPrompt = await axios.post(
      "https://cloud.leonardo.ai/api/rest/v1/prompt/improve",
      {
        prompt: `An album cover art describing the song '${song}' by artist '${artist}'. ${colorName} background, no letters, positioned off-center, undeformed, high quality, logical, relative to song.`,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
        },
      }
    );

    const improvedPrompt = getImprovedPrompt.data.promptGeneration.prompt;

    const getImageId = await axios.post(
      "https://cloud.leonardo.ai/api/rest/v1/generations",
      {
        photoReal: false,
        alchemy: true,
        expandedDomain: true,
        guidance_scale: 9,
        height: 768,
        width: 512,
        highContrast: true,
        highResolution: true,
        num_inference_steps: 60,
        modelId: "aa77f04e-3eec-4034-9c07-d0f619684628",
        prompt: improvedPrompt,
        negative_prompt:
          "Text, Letters, words, Low quality, 3D, disfigured, bad art, deformed, poorly drawn, close up, weird colors, blurry, ai animated, ai style.",
        nsfw: false,
        num_images: 1,
        presetStyle: "DYNAMIC",
        promptMagic: true,
        promptMagicStrength: 0.1,
        scheduler: "PNDM",
        sd_version: "v1_5",
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
        },
      }
    );

    const generatedImgId = getImageId.data.sdGenerationJob.generationId;

    let getImage;
    do {
      getImage = await axios.get(
        `https://cloud.leonardo.ai/api/rest/v1/generations/${generatedImgId}`,
        {
          headers: {
            authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
          },
        }
      );
    } while (getImage.data.generations_by_pk?.status === "PENDING");

    const image = getImage.data.generations_by_pk?.generated_images[0]?.url;

    res.status(200).json({
      imageUrl: image,
      mood: mood,
      keywords: lyricsList,
    });
  } catch (error) {
    console.error("Unknown error:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export default generate;
