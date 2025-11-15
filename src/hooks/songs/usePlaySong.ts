import { useRef } from "react";

export const usePlaySong = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySong = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  return { handlePlaySong, audioRef };
};
