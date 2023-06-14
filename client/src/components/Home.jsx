import Login from './Login'
import Navbar from './Navbar'
import Footer from './Footer'
import Gallery from './Gallery'
export default function Home() {
  return (
    <>
      <Navbar />
      <Login />
      <main className=" min-h-screen">
        <div className=" my-10 w-11/12 m-auto drop-shadow-2xl shadow-2xl border border-#c4c9d28b  bg-white bg-opacity-95 rounded-xl">
          <Gallery />
        </div>
      </main>
      <Footer />
    </>
  )
}
