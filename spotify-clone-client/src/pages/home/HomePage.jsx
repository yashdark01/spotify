
import Header from '@/components/Header';
import React, { use, useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGridSongs from './components/SectionGridSongs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMadeForYouSongs, fetchTrendingSongs } from '@/redux/playlistSlice';
import { useUser } from '@clerk/clerk-react';
import UserNotLogin from './components/UserNotLogin';
// import { Section } from 'lucide-react';


const HomePage = () => {
  const {madeForYouSongs,  madeForYouSongsLoading, trendingSongs, trendingLoading} = useSelector((state)=>state.playlists);
  const dispatch = useDispatch();
  const {user} = useUser();

  useEffect(() => {
    if (!madeForYouSongs.length) {
      dispatch(fetchMadeForYouSongs());
    }
  }, [dispatch, trendingSongs.length]);

  useEffect(() => {
    if(!madeForYouSongs.length){
      dispatch(fetchTrendingSongs());
    }
  }, [dispatch, trendingSongs.length]);
  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
    <Header/>
    {!user ? (
       <UserNotLogin/>
    ) :(<ScrollArea className='h-[calc(100vh-180px)]'>
      <div className='p-4 sm:p-6'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1>
        <FeaturedSection />

        <div className='space-y-8'>
          <SectionGridSongs title='Made For You' songs={madeForYouSongs} isLoading={madeForYouSongsLoading} />
          <SectionGridSongs title='Trending' songs={trendingSongs} isLoading={trendingLoading} />
        </div>
      </div>
    </ScrollArea>)}
  </main>
   
  )
}

export default HomePage