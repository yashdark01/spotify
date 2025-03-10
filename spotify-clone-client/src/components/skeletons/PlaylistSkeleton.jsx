
const PlaylistSkeleton = () => {
  return (
    <>
      {Array.from({length:6}).map((_, i)=>(
        <div key={i} className="p-2 rounded-sm flex items-center gap-3">
          <div className="w-12 h-12 bg-zinc-800 rounded-sm flex-shrink-0 animate-pulse"/>
          <div className="flex-1 min-w-0 hidden md:block space-y-2 ">
            <div className="h-4.5 bg-zinc-800 rounded-sm animate-pulse w-3/4"/>
            <div className="h-3 bg-zinc-800 rounded-sm animate-pulse w-1/2"/>
          </div>
        </div>
      ))}
    </>
  );
}

export default PlaylistSkeleton;
