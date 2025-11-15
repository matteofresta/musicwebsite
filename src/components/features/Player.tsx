import { Button } from "../ui/button";
import { FaPlay, FaPause } from "react-icons/fa";
import { Slider } from "@/components/ui/slider";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { usePlayer } from "@/context/PlayerContext";
import {
  IoVolumeHighSharp,
  IoVolumeLowSharp,
  IoVolumeMute,
} from "react-icons/io5";

export const Player = () => {
  const {
    isPlaying,
    handlePlayPause,
    duration,
    sliderValue,
    handleSliderChange,
    handleSliderMouseUp,
    handleSliderMouseDown,
    formatTime,
    handleNextSong,
    handleResetSong,
    currentSong,
    volume,
    handleVolumeChange,
    handleToggleMute,
  } = usePlayer();

  return (
    <>
      <div className="flex justify-between items-center dark:bg-(--backgroud-dark) dark:bg-opacity-70  bg-white/70 backdrop-blur-md p-4 w-full fixed bottom-0 h-24 backdrop:shadow-2xl">
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <div className="w-full flex items-center gap-3">
            <span className="text-xs w-10 text-center">
              {formatTime(sliderValue)}
            </span>
            <Slider
              className="cursor-pointer"
              onValueChange={handleSliderChange}
              onMouseDown={handleSliderMouseDown}
              onMouseUp={handleSliderMouseUp}
              min={0}
              max={duration || 0}
              value={[sliderValue]}
              step={1}
            />
            <span className="text-xs w-10 text-center">
              {formatTime(duration)}
            </span>
          </div>
          <div className="flex gap-3 items-center justify-center md:justify-between w-full px-6">
            <div className="hidden md:block">
              <img
                className={`w-16 h-16 object-cover rounded-full ${isPlaying ? "animate-spin-slow" : ""}`}
                src={currentSong?.cover}
                alt=""
              />
            </div>
            <div className="flex justify-center items-start gap-4">
              <Button
                onClick={handleResetSong}
                className="rounded-full p-2 bg-black w-10 h-10 cursor-pointer shadow-lg"
              >
                <TbPlayerTrackPrevFilled className="text-white" />
              </Button>
              <Button
                className="rounded-full p-2 bg-black w-10 h-10 cursor-pointer shadow-lg"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <FaPause className="text-white" />
                ) : (
                  <FaPlay className="text-white" />
                )}
              </Button>
              <Button
                onClick={handleNextSong}
                className="rounded-full p-2 bg-black w-10 h-10 cursor-pointer shadow-lg"
              >
                <TbPlayerTrackNextFilled className="text-white" />
              </Button>
            </div>
            <div className="md:flex hidden gap-3 items-center w-32">
              <div onClick={handleToggleMute} className="cursor-pointer">
                {volume === 0 && <IoVolumeMute />}
                {volume > 0 && volume < 0.5 && <IoVolumeLowSharp />}
                {volume >= 0.5 && <IoVolumeHighSharp />}
              </div>
              <Slider
                className="cursor-pointer"
                min={0}
                max={1}
                step={0.01}
                value={[volume]}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
