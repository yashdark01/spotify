import React, { useEffect, useMemo } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "../../components/skeletons/PlaylistSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbums } from "../../redux/playlistSlice";
import { useAuth } from "@clerk/clerk-react";

const LeftSideBar = React.memo(({ panelSize }) => {
  const dispatch = useDispatch();
  const { albums, loading } = useSelector((state) => state.albums);
  const { userId } = useAuth();

  useEffect(() => {
    if (albums.length === 0) {
      dispatch(fetchAlbums());
    }
  }, [dispatch, albums.length]);

  const albumLinks = useMemo(() => {
    return albums.map((album) => (
      <Link
        key={album._id}
        to={`/albums/${album._id}`}
        className="p-2 flex items-center gap-3 group cursor-pointer rounded-md hover:bg-zinc-800"
      >
        <img
          src={album.imageUrl}
          alt="Playlist Img"
          className="h-12 rounded-md flex-shrink-0 object-cover overflow-hidden"
        />
        <div className="flex-1 min-w-0 hidden md:block">
          {panelSize < 10 ? null : (
            <div>
              <p className="font-medium truncate">{album.title}</p>
              <p className="text-sm text-zinc-400 truncate">
                Album • {album.artist}
              </p>
            </div>
          )}
        </div>
      </Link>
    ));
  }, [albums, panelSize]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/** Menu bar section */}
      <div className="rounded-lg bg-zinc-900 p-4 space-y-2">
        <Link
          to="/"
          className={`flex flex-wrap ${
            panelSize < 12 ? "justify-center items-center p-3 " : "gap-3 p-4 "
          } font-semibold hover:bg-zinc-800 rounded-lg`}
        >
          <HomeIcon className={`${panelSize < 12 ? "size-7" : ""}`} />
          {panelSize < 12 ? "" : "Home"}
        </Link>
        <Link
          to="/chat"
          className={`flex flex-wrap ${
            panelSize < 12 ? "justify-center items-center p-3 " : "gap-3 p-4"
          } font-semibold hover:bg-zinc-800 rounded-lg`}
        >
          <MessageCircleIcon className={`${panelSize < 12 ? "size-7" : ""}`} />
          {panelSize < 12 ? "" : "Chat"}
        </Link>
      </div>

      {/** Library section */}
      <div className="rounded-lg flex-1 bg-zinc-900 p-4 space-y-2">
        <div className="flex items-center text-white px-2 mb-4">
          <Library className="size-5 mr-2" />
          <span className={`${panelSize < 10 ? "hidden" : "hidden md:inline"}`}>
            Playlists
          </span>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {loading || !userId ? <PlaylistSkeleton /> : albumLinks}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
});

export default LeftSideBar;