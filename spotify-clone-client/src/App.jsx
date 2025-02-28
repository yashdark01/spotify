import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Header from './components/Header'
import Footer from './components/Footer'
import PremiumPage from './pages/Premium'
import ArtistList from './components/ArtistCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <PremiumPage/>
    <ArtistList/>
     <h1 className=' text-9xl font-bold flex justify-center items-center'>Hello World</h1>

     <Footer/>
    </>
  )
}

export default App
