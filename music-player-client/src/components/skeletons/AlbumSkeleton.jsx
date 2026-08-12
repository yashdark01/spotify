import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";

const AlbumSkeleton = () => {
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
              <div className="w-[240px] h-[240px] bg-zinc-800 shadow-xl rounded-md animate-pulse" />
              <div className="flex flex-col justify-end">
                <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-[100px] mb-2" />
                <div className="h-8 bg-zinc-800 rounded-sm animate-pulse w-[200px] mb-4" />
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-1/2" />
                  <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-1/4" />
                  <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-1/4" />
                </div>
              </div>
            </div>
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all animate-pulse"
              >
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>
            <div className="bg-black/20 backdrop-blur-sm">
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-4 w-4 bg-zinc-800 rounded-sm animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded-sm animate-pulse" />
                      <div>
                        <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-3/4 mb-1" />
                        <div className="h-3 bg-zinc-800 rounded-sm animate-pulse w-1/2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-3/4" />
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 bg-zinc-800 rounded-sm animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumSkeleton;