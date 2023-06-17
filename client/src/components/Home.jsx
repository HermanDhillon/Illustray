import Login from './Login'
import Navbar from './Navbar'
import Footer from './Footer'
import GalleryHome from './GalleryHome'

export default function Home() {
  return (
    <>
      <Navbar />
      <Login />
      <main className="min-h-screen">
        <GalleryHome />
      </main>
      <Footer />
    </>
  )
}
