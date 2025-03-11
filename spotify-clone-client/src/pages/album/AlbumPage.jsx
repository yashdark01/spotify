import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAlbumById } from "@/redux/playlistSlice";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const AlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { album, loading } = useSelector((state) => state.albums);

  useEffect(() => {
    console.log("Fetching album with ID:", id);
    if (id) {
      dispatch(fetchAlbumById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div>
        <PlaylistSkeleton />
      </div>
    );
  }
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0] via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={album?.imageUrl}
                alt={album?.titile}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">{album?.title}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {album?.artist}
                  </span>
                  <span>{album?.songs?.length} songs</span>
                  <span>{album?.releaseyear}</span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>
            <div className=" bg-black/20 backdrop=blur-sm">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="px-0">
              <div className="space-y-2 py-4">
                {album?.songs?.length > 0 ? (
                  album.songs.map((song, index) => (
                    <div
                      key={song._id}
                      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <Play className="h-4 w-4 hidden group-hover:block" />
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="size-10 "
                        />
                        <div>
                          <div className="font-medium text">{song.title}</div>
                          <div className="text-xs text-zinc-400">
                            {song.artist}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                      <div className="flex items-center">{formatDuration(song.duration)}</div>
                    </div>
                    
                  ))
                ) : (
                  <p className="text-center text-zinc-400">
                    No songs available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
