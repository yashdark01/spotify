import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "../../components/skeletons/PlaylistSkeleton";

const LeftSideBar = () => {
  const isLoading = true;
  return (
    <div className="h-full flex flex-col gap-2">
      {/**menu bar section*/}
      <div className="rounded-lg bg-zinc-900 p-4 space-y-2">
        <div className="">
          <Link
            to={"/"}
            className="flex flex-wrap gap-3 font-semibold hover:bg-zinc-800 p-4 rounded-lg"
          >
            <HomeIcon />
            Home
          </Link>
        </div>
        <div>
          <Link
            to={"/chat"}
            className="flex flex-wrap gap-3 font-semibold hover:bg-zinc-800 p-4 rounded-lg"
          >
            <MessageCircleIcon />
            Messages
          </Link>
        </div>
      </div>

      {/** libary section */}
      <div className="rounded-lg flex-1 bg-zinc-900 p-4 space-y-2">
        <div className="flex item-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? <PlaylistSkeleton /> : "Some Music"}
          </div>
        </ScrollArea>{" "}
      </div>
    </div>
  );
};

export default LeftSideBar;
