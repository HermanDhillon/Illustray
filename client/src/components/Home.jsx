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
        {/* <div>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#8A3FFC"
              d="M33.4,-59.1C40.8,-53.5,42.8,-39.7,49.5,-28.4C56.3,-17.2,67.9,-8.6,71.9,2.3C75.9,13.2,72.3,26.5,65.4,37.5C58.5,48.4,48.3,57.2,36.8,61.4C25.4,65.7,12.7,65.4,1.9,62.1C-8.9,58.8,-17.8,52.5,-29.7,48.5C-41.5,44.5,-56.4,42.8,-65,35.1C-73.6,27.4,-76,13.7,-72.8,1.9C-69.6,-10,-60.7,-20,-52.4,-28.2C-44.1,-36.5,-36.4,-43.1,-27.8,-47.9C-19.1,-52.8,-9.6,-55.9,1.7,-58.8C13,-61.8,25.9,-64.6,33.4,-59.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div> */}
          <div>
            <h2 className="text-3xl font-extrabold ml-14 pt-5 mb-2">
              Latest Posts!
            </h2>
            <hr className="mx-10"></hr>
            <Gallery layout="rows" photos={postData} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mx-auto mt-5 mb-2 ml-14">
              Latest Prompts!
            </h2>
            <hr className="mx-8"></hr>
            <div className=" flex flex-col gap-5 my-10 ">
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
          <div className='absolute mt-auto'> 
          <a className='' href="https://www.freepik.com/free-vector/pattern-with-black-stars-white-background_949778.htm#query=stars%20doodle&position=13&from_view=search&track=ais">
            Image by 0melapics
          </a>
          <span>on Freepik</span>
          </div>
        </div>
      </main>
    </>
  )
}
