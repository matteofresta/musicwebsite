import { useState } from "react";
export const usePlayerFunctions = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  return { isPlaying, handlePlayPause };
};
