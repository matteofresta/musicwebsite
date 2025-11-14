import { useRef } from "react";

export const usePlaySong = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySong = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().then();
  };

  return { handlePlaySong };
};
