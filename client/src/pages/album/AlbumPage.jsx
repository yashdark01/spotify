import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchAlbumById } from "@/redux/playlistSlice";
import { setPlayerState, setTogglePlay } from "@/redux/playerSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import { FaPlay } from "react-icons/fa";

const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { album, albumLoading, error } = useSelector((state) => ({
    album: state.playlists.album || {},
    albumLoading: state.playlists.albumLoading,
    error: state.playlists.error,
  }));

  const { currentSong, queue, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumById(id));
    }
  }, [id, dispatch]);

  const songs = album?.songs ?? [];

  const handlePlayAlbum = () => {
    if (songs.length === 0) return;

    const isAlbumPlaying = queue.length > 0 && queue[0]?.albumId === album._id;

    if (isAlbumPlaying) {
      dispatch(setTogglePlay());
    } else {
      dispatch(
        setPlayerState({
          queue: songs,
          currentSong: songs[0],
          currentIndex: 0,
          isPlaying: true,
        })
      );
    }
  };

  const handlePlaySong = (index) => {
    if (songs.length === 0) return;
    if (currentSong?._id === songs[index]._id) dispatch(setTogglePlay());
    else {
      dispatch(
        setPlayerState({
          queue: songs,
          currentSong: songs[index],
          currentIndex: index,
          isPlaying: true,
        })
      );
    }
  };

  if (albumLoading) {
    return <AlbumSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-red-400">Could not load this album.</p>
        <Link to="/" className="text-sm text-emerald-400 hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  if (!album._id) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-zinc-400">Album not found.</p>
        <Link to="/" className="text-sm text-emerald-400 hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <ScrollArea className="min-h-full">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 min-h-full rounded-lg bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={album.imageUrl}
                alt={album.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">{album.title}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">{album.artist}</span>
                  <span>{songs.length} songs</span>
                  <span>{album.releaseYear || "Unknown Year"}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                disabled={songs.length === 0}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>

            {songs.length === 0 ? (
              <p className="px-6 text-zinc-400">No songs in this album yet.</p>
            ) : (
              <div className="px-6">
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <div>#</div>
                  <div>Title</div>
                  <div>Released Date</div>
                  <div>
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2 py-4">
                  {songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <Music className="size-4 text-green-500" />
                          ) : (
                            <span className="group-hover:hidden">{index + 1}</span>
                          )}
                          {(!isCurrentSong || !isPlaying) && (
                            <FaPlay className="h-3 w-3 hidden group-hover:block" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10 rounded-md"
                          />
                          <div>
                            <div className="font-medium">{song.title}</div>
                            <div className="text-xs text-zinc-400">{song.artist}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt ? song.createdAt.split("T")[0] : "Unknown"}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
