import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "../../components/skeletons/PlaylistSkeleton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbums } from "../../redux/playlistSlice";
import { useAuth } from "@clerk/clerk-react";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const { albums, loading } = useSelector((state) => state.albums);
  const {userId} = useAuth();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/** Menu bar section */}
      <div className="rounded-lg bg-zinc-900 p-4 space-y-2">
        <Link
          to={"/"}
          className="flex flex-wrap gap-3 font-semibold hover:bg-zinc-800 p-4 rounded-lg"
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          to={"/chat"}
          className="flex flex-wrap gap-3 font-semibold hover:bg-zinc-800 p-4 rounded-lg"
        >
          <MessageCircleIcon />
          Messages
        </Link>
      </div>

      {/** Library section */}
      <div className="rounded-lg flex-1 bg-zinc-900 p-4 space-y-2">
        <div className="flex item-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {loading || !userId ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="p-2 flex items-center gap-3 group cursor-pointer rounded-md hover:bg-zinc-800"
                >
                    <img src={album.imageUrl} alt="Playlist Img" className="h-12 rounded-md flex-shrink-0 object-cover overflow-hidden"/>
                    <div className="flex-1 min-w-0 hidden md:block">
                        <p className="font-medium truncate">{album.title}</p>
                        <p className="text-sm text-zinc-400 truncate">Album•{album.artist}</p>
                    </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;