import { Button } from "@/components/ui/button.tsx";
import { FaItunesNote, FaMusic } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input.tsx";
import { Link } from "@tanstack/react-router";
import { type Song } from "@/context/PlayerContext.tsx";
import {usePlaylistCreation} from "@/hooks/playlist/usePlaylistCreation.ts";

export class Playlist {
  id: string;
  name: string;
  songs: Song[];

  constructor(name: string, songs: Song[]) {
    this.id = Date.now().toString();
    this.name = name;
    this.songs = songs;
  }
}

export const HeaderPlaylist = () => {
  const {
      isDialogOpen,
      setIsDialogOpen,
      playlistName,
      setPlaylistName,
      error,
      setError,
      playlists,
      handleOpenDialog,
      handlePlaylistCreation,
      handlePlaylistDelete
  } = usePlaylistCreation()

  return (
    <>
      <div className="flex flex-wrap gap-4 mx-5 mt-10">
        {playlists.map((playlist) => (
          <Link
            to="/playlist/$playlistId"
            params={{ playlistId: playlist.id }}
            key={playlist.id}
          >
            <div className="border-4 border-gray-300 bg-gray-200 h-48 w-48 rounded-xl cursor-pointer flex flex-col items-center justify-center text-center relative p-2">
              <div>
                <Button
                  onClick={(e) => handlePlaylistDelete(e, playlist.id)}
                  className="absolute top-2 w-8 h-auto right-8 bg-transparent rounded-full hover:bg-gray-700 duration-300 cursor-pointer"
                >
                  <FaTrashAlt
                    className={
                      "text-red-500 text-xl cursor-pointer hover:text-red-700 transition-colors duration-300 "
                    }
                  />
                </Button>
                  <Button
                      className="absolute top-2 w-8 right-1 bg-transparent h-auto rounded-full hover:bg-gray-700 duration-300 cursor-pointer"
                  >
                      <IoMdSettings className="text-xl text-black hover:text-white duration-300 cursor-pointer"/>
                  </Button>
              </div>
              <FaMusic className="opacity-50 text-black text-4xl mb-2" />
              <span className="opacity-80 text-black font-bold">
                {playlist.name}
              </span>
            </div>
          </Link>
        ))}
        <div>
          <Button
            onClick={handleOpenDialog}
            className="border-dashed border-4 border-gray-500 cursor-pointer bg-gray-300 h-48 w-48 hover:bg-gray-400 flex-col"
          >
            <FaItunesNote className="opacity-50 text-black text-4xl" />
            <span className="opacity-50 text-black mt-2">
              Create a Playlist
            </span>
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-[30rem]">
              <DialogHeader>
                <DialogTitle>Erstelle eine Playlist</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePlaylistCreation}>
                <div className="flex flex-col space-y-4 pt-4">
                  <div>
                    <p className="my-6">
                      Erstelle eine Playlist und füge deine song hinzu
                    </p>
                    <Input
                      className="mb-6"
                      value={playlistName}
                      onChange={(e) => {
                        setPlaylistName(e.target.value);
                        if (error) {
                          setError(null);
                        }
                      }}
                      placeholder="Name eingeben"
                    />
                    {error && (
                      <span className="text-red-500 text-sm">{error}</span>
                    )}
                  </div>
                  <Button type="submit" className="cursor-pointer self-end">
                    Playlist erstellen <FaPlus className="text-white ml-2" />
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};
