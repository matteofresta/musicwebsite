import React, {type FormEvent, useEffect, useState} from "react";
import {usePlaylists} from "@/context/PlaylistContext.tsx";

export const usePlaylistCreation = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { playlists, addPlaylist, deletePlaylist } = usePlaylists();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
        setPlaylistName("");
        setError(null);
    };

    const handlePlaylistCreation = (e?: FormEvent) => {
        e?.preventDefault();
        if (!playlistName.trim()) {
            setError("Bitte geben Sie einen Namen für die Playlist ein.");
            return;
        }
        addPlaylist(playlistName.trim());
        setIsDialogOpen(false);
    };

    const handlePlaylistDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        playlistId: string
    ) => {
        e.preventDefault();
        e.stopPropagation();
        deletePlaylist(playlistId);
    };

    return {
        isDialogOpen,
        setIsDialogOpen,
        playlistName,
        setPlaylistName,
        error,
        setError,
        playlists,
        addPlaylist,
        deletePlaylist,
        handleOpenDialog,
        handlePlaylistCreation,
        handlePlaylistDelete
    }
};
