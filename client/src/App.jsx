import { useCookies } from 'react-cookie'
import { useState } from 'react'
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
  const [render, setRender] = useState(false)

  return (
    <>
      <Navbar render={render} cookies={cookies} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/prompt/:promptId"
          element={
            <Prompt setRender={setRender} render={render} cookies={cookies} />
          }
        />
        <Route
          path="/prompt/:promptId/:postId"
          element={
            <Prompt setRender={setRender} render={render} cookies={cookies} />
          }
        />
        <Route
          path="/user/:username/settings"
          element={
            <Settings cookies={cookies} setRender={setRender} render={render} />
          }
        />
        <Route
          path="/user/:username"
          element={
            <User cookies={cookies} setRender={setRender} render={render} />
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
