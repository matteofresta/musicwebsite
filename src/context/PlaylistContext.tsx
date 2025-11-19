import React, { createContext, useState, type ReactNode, useContext } from "react";
import { Playlist } from "@/components/features/HeaderPlaylist.tsx";
import { type Song } from "@/context/PlayerContext.tsx";

interface PlaylistContextType {
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  addPlaylist: (name: string) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const addPlaylist = (name: string) => {
    const newPlaylist = new Playlist(name, []);
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
  };

  const deletePlaylist = (id: string) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== id)
    );
  };

  const addSongToPlaylist = (playlistId: string, song: Song) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        setPlaylists,
        addPlaylist,
        deletePlaylist,
        addSongToPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylists must be used within a PlaylistProvider");
  }
  return context;
};
