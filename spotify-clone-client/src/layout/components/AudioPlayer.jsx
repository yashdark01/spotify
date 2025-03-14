import React, { useEffect, useRef, useCallback } from "react";
import {
  setPlayNextSong,
} from "@/redux/playerSlice";
import { useSelector, useDispatch } from "react-redux";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const prevSongRef = useRef(null);
  const dispatch = useDispatch();

  const { currentSong, isPlaying} = useSelector(
    (state) => state.player
  );

  // Play or Pause when isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => console.error("Audio play error:", error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Function to handle song end event
  const handleEnded = useCallback(() => {
    dispatch(setPlayNextSong());
  }, [dispatch]);

  // Add and remove event listener for "ended"
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleEnded]);

  // Handle song change
  useEffect(() => {
    if (!audioRef.current || !currentSong?.audioUrl) return;

    const audio = audioRef.current;

    // Check if song has changed
    if (prevSongRef.current !== currentSong.audioUrl) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;

      // Autoplay if already playing
      if (isPlaying) {
        audio.play().catch((error) => console.error("Audio autoplay error:", error));
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;