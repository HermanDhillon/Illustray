import Gallery from './Gallery'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Uploader from './Upload_Modal'

export default function Prompt(props) {
  const { promptId, postId } = useParams()
  const [errorData, setErrorData] = useState(false)
  const [postData, setPostData] = useState(undefined)
  const [userData, setUserData] = useState({
    username: 'Loading...',
    bio: 'Loading...',
  })
  const [promptData, setPromptData] = useState({
    title: 'Loading...',
    promptText: 'Loading...',
    createdAt: 'Loading...',
  })

  function handleClick() {
    if (props.cookies.username) {
      window.upload_modal.showModal()
    } else {
      window.login_modal.showModal()
    }
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/prompt/${promptId}`,
    })
      .then((response) => {
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
      })
      .catch((error) => {
        console.log(error)
        setErrorData(error.response.data)
      })

    axios({
      method: 'get',
      url: `/api/post/prompt/${promptId}`,
    })
      .then((response) => {
        const posts = response.data.map((post) => ({
          src: post.image_url,
          width: post.width,
          height: post.height,
          id: post.id,
          promptId: promptId,
          profileImage: post.profileimage,
          username: post.username,
        }))
        setPostData(posts)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [promptId, props.render])

  return (
    <div className="bg-[url('/./src/assets/im3.jpg')] ">
      <div className="bg-white bg-opacity-90">
        <div className="min-h-screen py-[4vw]  ">
          {!errorData && (
            <div>
              <div className="w-[85vw] mx-auto mb-[65px] bg-white bg-opacity-95 rounded-xl shadow-xl  drop-shadow-2xl border border-#c4c9d28b  lg:min-h-[20vw] flex flex-col-reverse lg:flex-row lg:w-[60vw]">
                <div className="m-[2vh] mb-0 md:mt-0 lg:w-[100%] relative flex flex-col lg:mb-[1vw] ">
                  <div className="flex flex-col-reverse md:flex-row md:justify-between ">
                    <div>
                      <h2 className="font-semibold leading-[4vw] text-[2vh] m-none">
                        PROMPT:
                      </h2>
                      <h3 className="font-semibold text-[2.5vh] m-0 underline break-words">
                        {promptData.title}
                      </h3>
                    </div>
                    <div className=" mb-2 py-2 rounded-xl border font-extrabold border-#c4c9d28b md:min-w-[20%] md:mt-[1vw] md:ml-0 ">
                      <div className="flex flex-row ">
                        <a
                          href={`/user/${userData.username}`}
                          className="avatar"
                        >
                          <div className="w-16 mask mask-squircle mx-2">
                            <img
                              className="inline-block"
                              src={userData.profileImage}
                            />
                          </div>
                        </a>

                        <h4 className=" my-auto mr-1 text-lg break-words">
                          {userData.username}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <p className=" break-words font-semibold leading-[3.5vh] text-[2vh] mb-[2vw] lg:text-[1.2vw] lg:leading-[3vw]">
                    {promptData.promptText}
                  </p>
                  <span className="mt-auto ml-auto italic">
                    {new Date(promptData.createdAt).toDateString()}
                  </span>
                  <button
                    className="btn btn-primary btn-block mt-auto mb-[2vw] border-none bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-[#6025F5]/50 h-[3vw] text-[1.5vh] lg:mb-[0] md:mt-2 md:mx-auto"
                    onClick={() => handleClick()}
                  >
                    Submit your Art!
                  </button>
                </div>
              </div>
              <Gallery
                postsData={postData}
                postId={postId}
                layout="columns"
                setRender={props.setRender}
              />
            </div>
          )}
          {errorData && (
            <div className="flex justify-center w-11/12 mx-auto py-10 bg-white bg-opacity-95 rounded-xl shadow-2xl  drop-shadow-2xl border border-#c4c9d28b mt-24">
              <h1 className="text-3xl font-medium text-gray-700">
                {errorData}
              </h1>
            </div>
          )}
        </div>
      </div>
      <Uploader
        setRender={props.setRender}
        uploadUrl={`/api/post/${promptId}`}
      />
    </div>
  )
}
