import Gallery from './Gallery'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Uploader from './Upload_Modal'

export default function Prompt() {
  let [userData, setUserData] = useState({
    username: 'Loading...',
    bio: 'Loading...',
  })
  const [promptData, setPromptData] = useState({
    title: 'Loading...',
    promptText: 'Loading...',
    createdAt: 'Loading...',
  })
  const { promptId } = useParams()

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/prompt/${promptId}`,
    })
      .then((response) => {
        if ('Error' in response.data) {
          console.log(response.data)
          setPromptData(false)
        } else {
          setPromptData({
            title: response.data.title,
            promptText: response.data.promptText,
            creatorID: response.data.creatorId,
            createdAt: response.data.createdAt,
          })
          setUserData({
            username: response.data.username,
            bio: response.data.bio,
            profileImage: response.data.profileimage,
          })
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [promptId])

  return (
    <div className="bg-[url('/./src/assets/im3.jpg')] bg-opacity-10 ">
      <div className="bg-white bg-opacity-90">
        <div className="min-h-screen py-[4vw]  ">
          {promptData && (
            <div>
              <div className="w-[85vw] mx-auto mb-[65px] bg-white bg-opacity-95 rounded-xl shadow-xl  drop-shadow-2xl border border-#c4c9d28b  lg:min-h-[20vw] flex flex-col-reverse lg:flex-row lg:w-[60vw]">
                <div className="m-[2vh] mb-0 md:mt-0 lg:w-[70%] relative flex flex-col lg:mb-[1vw] ">
                  <h2 className="font-semibold leading-[4vw] text-[2vh] m-none">
                    PROMPT:
                  </h2>
                  <h3 className="font-semibold text-[2.5vh] m-0 underline ">
                    {promptData.title}
                  </h3>
                  <p className="font-semibold leading-[3.5vh] text-[2vh] mb-[2vw] lg:text-[1.2vw] lg:leading-[3vw]">
                    {promptData.promptText}
                  </p>
                  <span className="mt-auto ml-auto italic">
                    {promptData.createdAt.slice(0, 10)}
                  </span>
                  <button
                    className="btn btn-primary btn-block mt-auto mb-[2vw] border-none bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-[#6025F5]/50 h-[3vw] text-[1.5vh] lg:mb-[0] "
                    onClick={() => window.upload_modal.showModal()}
                  >
                    Submit your Art!
                  </button>
                </div>
                <div className="m-[2vw] mb-0 py-2 rounded-xl border border-#c4c9d28b lg:w-[20vw]  lg:m-[1vw] lg:ml-0 lg:min-h-[20vw]">
                  <div className="flex flex-row">
                    <img
                      className="h-[4vw] min-h-[4rem] mask mask-squircle overflow-hidden flex-start"
                      src={userData.profileImage}
                    />
                    <h4 className=" my-auto mr-auto text-lg">
                      {userData.username}
                    </h4>
                  </div>
                </div>
              </div>
              <Gallery layout="columns" />
            </div>
          )}
          {!promptData && (
            <div className="flex justify-center w-11/12 mx-auto py-10 bg-white bg-opacity-95 rounded-xl shadow-2xl  drop-shadow-2xl border border-#c4c9d28b mt-24">
              <h1 className="text-3xl font-medium text-gray-700">
                This prompt doesnt exist.
              </h1>
            </div>
          )}
        </div>
      </div>
      <Uploader />
    </div>
  )
}
