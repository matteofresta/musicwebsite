import { songs } from "@/components/songs";
import { usePlayer } from "@/context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { usePlaylists } from "@/context/PlaylistContext.tsx";
import { type Song } from "@/context/PlayerContext.tsx";

export const Header = () => {
    const { handlePlaySong, handlePlayPause, isPlaying, currentSong } =
        usePlayer();
    const { playlists, addSongToPlaylist } = usePlaylists();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const handleOpenDialog = (song: Song) => {
        setSelectedSong(song);
        setOpenDialog(true);
    };

    const handleAddToPlaylist = (playlistId: string) => {
        if (selectedSong) {
            addSongToPlaylist(playlistId, selectedSong);
            setOpenDialog(false);
        }
    };

    return (
        <>
            <div className="grid 2xl:grid-cols-6 md:grid-cols-3 grid-cols-2 w-full p-10 dark:bg-(--backgroud-dark)">
                {songs().map((song) => {
                    const isThisSongPlaying =
                        isPlaying && currentSong?.song === song.song;

                    return (
                        <div
                            key={song.song}
                            className="flex flex-col gap-2 w-60 text-center"
                        >
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
                                    className="rounded-lg max-w-60 h-60 aspect-square object-cover shadow-lg duration-300 group-hover:brightness-75"
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
                            <div className="flex">
                                <div className="flex justify-center w-full flex-col">
                                    <p className="text-xl font-bold hover:underline cursor-pointer">
                                        {song.songName}
                                    </p>
                                    <p>{song.artist}</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex justify-end w-auto">
                                            <BsThreeDotsVertical className="text-black dark:text-white text-4xl cursor-pointer p-2 hover:bg-gray-500/50 duration-300 rounded-full" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem onClick={() => handleOpenDialog(song)}>
                                            Playlist Hinzufügen
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add to Playlist</DialogTitle>
                    </DialogHeader>
                    <div>
                        {playlists.map((playlist) => (
                            <div
                                key={playlist.id}
                                className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                                onClick={() => handleAddToPlaylist(playlist.id)}
                            >
                                {playlist.name}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
