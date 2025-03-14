import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerState, setTogglePlay } from '@/redux/playerSlice';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';


const PlayButton = ({song}) => {
    const {currentSong, queue, isPlaying} = useSelector((state) => state.player);
    const dispatch = useDispatch();

    const isCurrentSong = currentSong?._id === song._id;

    const handlePlay = () => {
        if(isCurrentSong) dispatch(setTogglePlay());
        else dispatch(setPlayerState({currentSong: song, queue: [song], isPlaying: true}));
    }
  return <Button
  onClick={handlePlay}
  className={`absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 
     transition-all duration-500 opacity-0 translate-y-2 group-hover:translate-y-0 
     ${isCurrentSong ? "opacity-100 translate-y-0 " : "opacity-0 group-hover:opacity-100 "}`}
  >
    {isCurrentSong && isPlaying ? <Pause className='size-4 text-black'/> : <Play className='size-4 text-black'/>}
  </Button>
}

export default PlayButton