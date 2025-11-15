import { songs } from "@/components/songs";
import { usePlayer } from "@/context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";

export const Header = () => {
  const { handlePlaySong, handlePlayPause, isPlaying, currentSong } =
    usePlayer();

  return (
    <>
      <div>
        <div className="grid 2xl:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-8 p-10 dark:bg-(--backgroud-dark)  ">
          {songs().map((song) => {
            const isThisSongPlaying =
              isPlaying && currentSong?.song === song.song;

            return (
              <div key={song.song} className="flex flex-col gap-2 text-center">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => {
                    if (isThisSongPlaying) {
                      handlePlayPause();
                    } else {
                      handlePlaySong(song);
                    }
                  }}
                >
                  <img
                    className="rounded-lg w-80 h-auto aspect-square object-cover shadow-lg duration-300 group-hover:brightness-75"
                    src={song.cover}
                    alt={`${song.songName} cover`}
                  />
                  <div className="absolute rounded-lg inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isThisSongPlaying ? (
                      <FaPause className="text-white text-4xl" />
                    ) : (
                      <FaPlay className="text-white text-4xl" />
                    )}
                  </div>
                </div>
                <p className="text-xl font-bold hover:underline cursor-pointer">
                  {song.songName}
                </p>
                <p>{song.artist}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
