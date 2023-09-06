import Gallery from './Gallery'
import photos from './photos'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Gallery layout="columns" photos={photos} />
      </main>
    </>
  )
}
