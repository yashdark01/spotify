import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import PremiumPage from './pages/Premium'
import ArtistList from './components/ArtistCard'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Routes>
        <Route path ='/' element={<HomePage/>}/>
        <Route path = '/sso-callback' element={<AuthenticateWithRedirectCallback
        signUpForceRedirectUrl={'/auth-callback'}
        />}/>
        <Route path = '/auth-callback' element={<AuthCallbackPage/>}/>
        <Route path='/premium' element={<PremiumPage/>}/>
        <Route path='/artists' element={<ArtistList/>}/>
      </Routes>
      <Footer/>
   </>
  )
}

export default App
