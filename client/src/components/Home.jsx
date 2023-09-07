import { useState, useEffect } from 'react'
import Gallery from './Gallery'
import axios from 'axios'

export default function Home() {
  const [postData, setPostData] = useState({})

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/post/home`,
    })
      .then((response) => {
        const posts = response.data.map((post) => ({
          src: post.image_url,
          width: post.width,
          height: post.height,
        }))
        setPostData(posts)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <main className="min-h-screen">
        <h2 className="text-3xl font-extrabold ml-14 mt-5 mb-2">
          Latest Posts!
        </h2>
        <hr className="mx-10"></hr>
        <Gallery layout="rows" photos={postData} />
      </main>
    </>
  )
}
