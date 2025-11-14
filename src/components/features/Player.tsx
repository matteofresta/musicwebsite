import { Button } from "../ui/button";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { usePlayerFunctions } from "@/hooks/Player/usePlayerFunctions.ts";
export const Player = () => {
  const { isPlaying, handlePlayPause } = usePlayerFunctions();

  return (
    <>
      <div className="flex justify-between items-center p-4 w-full fixed bottom-0 h-24 backdrop:shadow-2xl">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          className="w-full h-1 bg-gray-200 rounded-full cursor-pointer appearance-none beh"
        />
        <div></div>
        <div className="flex gap-4">
          <Button className="rounded-full p-2 bg-black w-10 h-10 cursor-pointer shadow-lg">
            <TbPlayerTrackPrevFilled className="text-white" />
          </Button>
          <Button
            className="rounded-full p-2 bg-black w-10 h-10 cursor-pointer shadow-lg"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPlay className="text-white" /> : <FaPause />}
          </Button>
          <Button className="rounded-full p-2 bg-black w-10 h-10 cursor-pointer shadow-lg">
            <TbPlayerTrackNextFilled className="text-white" />
          </Button>
        </div>
        <div></div>
      </div>
    </>
  );
};
