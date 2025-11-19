import { createFileRoute } from "@tanstack/react-router";
import { usePlaylists } from "@/context/PlaylistContext.tsx";
import { FaMusic } from "react-icons/fa";
import { usePlayer } from "@/context/PlayerContext.tsx";

export const Route = createFileRoute("/playlist/$playlistId")({
  component: PlaylistComponent,
});

function PlaylistComponent() {
  const { playlistId } = Route.useParams();
  const { playlists } = usePlaylists();
  const { handlePlaySong } = usePlayer();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="text-white text-2xl flex justify-center items-center h-full">
        Playlist not found
      </div>
    );
  }

  return (
    <div className="text-white">
      <header className="flex items-end gap-6 p-8 bg-gradient-to-t from-neutral-900 to-neutral-800 h-80">
        <div className="w-48 h-48 bg-neutral-700 rounded-md flex items-center justify-center">
          <FaMusic className="text-7xl text-neutral-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold">Playlist</h2>
          <h1 className="text-8xl font-bold tracking-tighter">
            {playlist.name}
          </h1>
          <p className="text-neutral-300 mt-2">
            {playlist.songs.length} songs
          </p>
        </div>
      </header>

      <div className="p-8">
        {playlist.songs.length > 0 ? (
          <ul>
            {playlist.songs.map((song, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-800 cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-neutral-400">{index + 1}</span>
                  <img src={song.cover} alt={song.songName} className="w-10 h-10 rounded-md" />
                  <div>
                    <p className="font-semibold">{song.songName}</p>
                    <p className="text-sm text-neutral-400">{song.artist}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-400">
            This playlist is empty. Add some songs!
          </p>
        )}
      </div>
    </div>
  );
}
