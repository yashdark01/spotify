import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPlayNextSong,
  setPlayerState,
  setTogglePlay,
  setPlayPreviousSong,
  setRepeatSong,
} from "@/redux/playerSlice";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  ListMusic,
  Mic2,
  Laptop2,
  Volume1,
} from "lucide-react";

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControl = () => {
  const { currentSong, queue, isPlaying, currentIndex, repeatMode } =
  useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(75);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    audioRef.current.volume = volume / 100;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (currentIndex < queue.length - 1) {
        dispatch(setPlayNextSong());
      } else if (repeatMode === "all") {
        dispatch(setPlayNextSong(0)); // Restart queue from first song
      } else {
        dispatch(setPlayerState({ isPlaying: false }));
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, repeatMode, currentIndex, queue]);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <footer className="h-20 w-full sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Song Info */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={() => dispatch(setPlayPreviousSong())}
              disabled={currentIndex === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              onClick={() => dispatch(setTogglePlay())}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={() => dispatch(setPlayNextSong())}
              disabled={!currentSong}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
              onClick={() => dispatch(setRepeatSong())}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {formatDuration(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full"
              onValueChange={handleSeek}
            />
            <div className="text-xs text-zinc-400 ">
              {formatDuration(duration)}
            </div>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Laptop2 className="h-4 w-4" />
          </Button>
          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="w-24"
            onValueChange={(value) => {
              setVolume(value[0]);
              if (audioRef.current) {
                audioRef.current.volume = value[0] / 100;
              }
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControl;
