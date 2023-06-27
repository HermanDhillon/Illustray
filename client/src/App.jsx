import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Settings from './components/Settings'
import Profile from './components/Profile'
import Prompt from './components/Prompt'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
