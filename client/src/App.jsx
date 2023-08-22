import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Settings from './components/Settings'
import User from './components/User'
import Prompt from './components/Prompt'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookie] = useCookies('username')

  return (
    <>
      <Navbar cookies={cookies} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user/:username" element={<User cookies={cookies} />} />
        <Route path="/prompt/:promptId" element={<Prompt />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
