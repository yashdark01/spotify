import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAlbumById } from "@/redux/playlistSlice";
import { setPlayerState, setTogglePlay } from "@/redux/playerSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import { FaPlay } from "react-icons/fa";

// Helper function to format duration
const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select album & player state from Redux
  const { album, albumLoading } = useSelector((state) => ({
    album: state.playlists.album || { songs: [] },
    albumLoading: state.playlists.albumLoading,
  }));

  const { currentSong, queue, isPlaying, currentIndex } = useSelector((state) => state.player);

  // Debugging Console Logs
  useEffect(() => {
    console.log("Album:", album);
    console.log("Current Song:", currentSong);
    console.log("Queue:", queue);
    console.log("Is Playing:", isPlaying);
    console.log("Current Index:", currentIndex);
  }, [album, currentSong, queue, isPlaying, currentIndex]);

  // Fetch album details
  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumById(id));
    }
  }, [id, dispatch]);

  // Play or Pause Album
  const handlePlayAlbum = () => {
    if (!album || album.songs.length === 0) return;

    const isAlbumPlaying = queue.length > 0 && queue[0].albumId === album._id;

    if (isAlbumPlaying) {
      dispatch(setTogglePlay());
    } else {
      dispatch(setPlayerState({ 
        queue: album.songs,
        currentSong: album.songs[0],
        currentIndex: 0,
        isPlaying: true
      }));
    }
  };

  // Play a specific song
  const handlePlaySong = (index) => {
    if (!album || album.songs.length === 0) return;
    if(currentSong?._id === album.songs[index]._id) dispatch(setTogglePlay());
    else{
      dispatch(setPlayerState({ 
        queue: album.songs,
        currentSong: album.songs[index],
        currentIndex: index,
        isPlaying: true
      }));

    }
   
  };

  // Show skeleton loader while fetching data
  if (albumLoading || !album.songs || album.songs.length === 0) {
    return <AlbumSkeleton />;
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
                  <span>{album.songs.length} songs</span>
                  <span>{album.releaseYear || "Unknown Year"}</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>

            {/* Song List Header */}
            <div className="px-6">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* Song List */}
              <div className="space-y-2 py-4">
                {album.songs.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id;

                  return (
                    <div
                      key={song._id}
                      onClick={() => handlePlaySong(index)}
                      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                    >
                      {/* Song Index or Play Icon */}
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

                      {/* Song Info */}
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

                      {/* Released Date */}
                      <div className="flex items-center">
                        {song.createdAt ? song.createdAt.split("T")[0] : "Unknown"}
                      </div>

                      {/* Duration */}
                      <div className="flex items-center">{formatDuration(song.duration)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;