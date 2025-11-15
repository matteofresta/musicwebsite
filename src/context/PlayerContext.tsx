import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import { songs } from "@/components/songs.ts";

export interface Song {
  artist: string;
  songName: string;
  song: string;
  cover: string;
}

interface PlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  duration: number;
  formatTime: (time: number) => string;
  currentTime: number;
  volume: number;
  currentSong: Song | null;
  handlePlaySong: (song: Song) => void;
  handlePlayPause: () => void;
  handleResetSong: () => void;
  handleNextSong: () => void;
  handleSliderChange: (value: number[]) => void;
  handleSliderMouseUp: () => void;
  handleSliderMouseDown: () => void;
  sliderValue: number;
  handleSeek: (time: number) => void;
  handleVolumeChange: (value: number[]) => void;
  handleToggleMute: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(1);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const animationFrameRef = useRef<number>(null);

  const handlePlaySong = useCallback((song: Song) => {
    if (audioRef.current) {
      setCurrentSong(song);
      audioRef.current.src = song.song;
      audioRef.current.play();
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleResetSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleNextSong = useCallback(() => {
    const songList = songs();
    if (songList.length === 0) {
      return;
    }

    const currentIndex = currentSong
      ? songList.findIndex((s) => s.song === currentSong.song)
      : -1;
    let nextIndex;

    if (songList.length === 1) {
      nextIndex = 0;
    } else {
      do {
        nextIndex = Math.floor(Math.random() * songList.length);
      } while (nextIndex === currentIndex);
    }

    const nextSong = songList[nextIndex];
    handlePlaySong(nextSong);
  }, [currentSong, handlePlaySong]);

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0) {
        setVolumeBeforeMute(newVolume);
      }
    }
  };

  const handleToggleMute = () => {
    if (volume > 0) {
      setVolumeBeforeMute(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    } else {
      setVolume(volumeBeforeMute);
      if (audioRef.current) {
        audioRef.current.volume = volumeBeforeMute;
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleSliderChange = (value: number[]) => {
    const time = value[0];
    setSliderValue(time);
    handleSeek(time);
  };

  const handleSliderMouseUp = () => {
    setIsSeeking(false);
  };

  const handleSliderMouseDown = () => {
    setIsSeeking(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const animate = () => {
      if (audio) {
        setSliderValue(audio.currentTime);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying && !isSeeking) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio?.currentTime || 0);
    const handleLoadedMetadata = () => setDuration(audio?.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      handleNextSong();
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [handleNextSong]);

  const value: PlayerContextType = {
    formatTime,
    sliderValue,
    handleSliderChange,
    handleSliderMouseUp,
    handleSliderMouseDown,
    audioRef,
    isPlaying,
    duration,
    currentTime,
    volume,
    currentSong,
    handlePlaySong,
    handlePlayPause,
    handleResetSong,
    handleNextSong,
    handleSeek,
    handleVolumeChange,
    handleToggleMute,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};
