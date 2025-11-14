import { songs } from '@/components/songs'
import { usePlaySong } from '@/hooks/songs/usePlaySong'
export const Header = () => {

    const { handlePlaySong } = usePlaySong();

    return (
        <>
            <div>
                <div>
                    {songs().map((song) => (
                        <div key={song.song} className="flex flex-col gap-2">
                            <img
                                className="rounded-lg w-56 shadow-lg cursor-pointer"
                                src={song.cover}
                                alt={`${song.songName} cover`}
                                onClick={() => handlePlaySong(song.song)}
                            />
                            <p>{song.songName}</p>
                            <p>{song.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
