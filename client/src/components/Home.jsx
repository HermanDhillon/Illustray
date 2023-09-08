import { useState, useEffect } from 'react'
import Gallery from './Gallery'
import axios from 'axios'

export default function Home() {
  const [postData, setPostData] = useState({})
  const [promptData, setPromptData] = useState([])

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

    axios({
      method: 'get',
      url: `/api/prompt/home`,
    })
      .then((response) => {
        console.log(response.data)
        setPromptData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <main className="min-h-screen bg-[url('/./src/assets/stars.jpeg')] bg-fixed">
        <div className="bg-white bg-opacity-80">
          <div>
            <h2 className="text-3xl font-extrabold ml-14 pt-5 mb-2">
              Latest Posts!
            </h2>
            <hr className="mx-10"></hr>
            <Gallery layout="rows" photos={postData} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold ml-14 mt-5 mb-2">
              Latest Prompts!
            </h2>
            <hr className="mx-10"></hr>
            <div className=" flex flex-col justify-between gap-5 my-10 ">
              {promptData.map((prompt, i) => (
                <div
                  key={i + 1}
                  className="card w-11/12 mx-auto bg-base-100 shadow-2xl drop-shadow-2xl "
                >
                  <a
                    href={`/user/${prompt.username}`}
                    className="avatar absolute -right-3 -top-3  drop-shadow-2xl"
                  >
                    <div className="w-16 mask mask-squircle ">
                      <img className="" src={prompt.profileimage} />
                    </div>
                  </a>
                  <div className="card-body overflow-hidden break-words">
                    <h2 className="card-title text-primary">{prompt.title}</h2>
                    <p>{prompt.prompt_text}</p>
                    <span className=" font-semibold">- {prompt.username}</span>
                    <div className="card-actions ssm:justify-between">
                      <span className="mt-auto italic ">
                        {new Date(prompt.created_at).toDateString()}
                      </span>
                      <a
                        href={`/prompt/${prompt.id}`}
                        className="mx-auto ssm:mx-0"
                      >
                        <button className="btn btn-outline btn-secondary ">
                          Go to Prompt
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <a href="https://www.freepik.com/free-vector/pattern-with-black-stars-white-background_949778.htm#query=stars%20doodle&position=13&from_view=search&track=ais">
          Image by 0melapics
        </a>{' '}
        on Freepik
      </main>
    </>
  )
}
