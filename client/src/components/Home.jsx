import Login from './Login'
import Navbar from './Navbar'
import Footer from './Footer'
export default function Home() {
  return (
    <>
      <Navbar />
      <Login />
      <main className=" min-h-screen">content</main>
      <Footer />
    </>
  )
}
