import { useCookies } from 'react-cookie'
import { Routes, Route } from 'react-router-dom'
import User from './components/User'
import Home from './components/Home'
import Signup from './components/Signup'
import Prompt from './components/Prompt'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Settings from './components/Settings'

function App() {
  const [cookies, setCookie] = useCookies()

  return (
    <>
      <Navbar cookies={cookies} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/prompt/:promptId" element={<Prompt />} />
        <Route
          path="/user/:username/settings"
          element={<Settings cookies={cookies} />}
        />
        <Route path="/user/:username" element={<User cookies={cookies} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
