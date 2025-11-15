import { useState, useEffect } from "react";
import { usePlaySong } from "@/hooks/songs/usePlaySong.ts";

export const usePlayerFunctions = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef } = usePlaySong();

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audio) {
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, [audioRef]);

  return { isPlaying, handlePlayPause };
};
