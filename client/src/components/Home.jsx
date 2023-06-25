import Login from './Login'
import Navbar from './Navbar'
import Footer from './Footer'
import Gallery from './Gallery'

export default function Home() {
  return (
    <>
      <Navbar />
      <Login />
      <main className="min-h-screen">
        <Gallery layout="columns" />
      </main>
      <Footer />
    </>
  )
}
