import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeaturedSongs } from "@/redux/playlistSlice";
import FeaturedSkeleton from "@/components/skeletons/FeaturedSkeleton";
// import { PlayButton } from "@/components/PlayButton";

const FeaturedSection = () => {
    const { featuredSong, featuredSongLoading, error } = useSelector((state) => state.playlists);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!featuredSong.length) {
            dispatch(fetchFeaturedSongs());
        }
    }, [dispatch, featuredSong.length]);

    if (featuredSongLoading) return <FeaturedSkeleton />;
    if (error) return <div className="text-red-500 text-center">{error.message || "Something went wrong!"}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mb-8">
            {featuredSong.map((song) => (
                <div
                    key={song._id}
                    className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden 
                    hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
                >
                    <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 p-4">
                        <p className="font-medium truncate">{song.title}</p>
                        <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                    </div>
                    {/* <PlayButton song={song} /> */}
                </div>
            ))}
        </div>
    );
};

export default FeaturedSection;