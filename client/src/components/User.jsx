import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Prompt_Modal from './Prompt_Modal'
import axios from 'axios'
import Gallery from './Gallery'

export default function User(props) {
  const [postData, setPostData] = useState(null)
  const [promptData, setPromptData] = useState([])
  const [postCount, setPostCount] = useState('N/A')
  const [promptCount, setPromptCount] = useState('N/A')

  const [toggleView, setToggleView] = useState({
    promptVis: ' hidden',
    promptStat: '',
    postVis: '',
    postStat: ' tab-active',
  })
  const [userData, setUserData] = useState({
    username: 'Loading...',
    bio: 'Loading...',
  })
  const { username } = useParams()
  let ownPage = props.cookies.username == username

  function togglePrompt() {
    setToggleView({
      promptVis: '',
      promptStat: ' tab-active',
      postVis: ' hidden',
      postStat: '',
    })
  }
  function togglePost() {
    setToggleView({
      promptVis: ' hidden',
      promptStat: '',
      postVis: '',
      postStat: ' tab-active',
    })
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/user/${username}`,
    })
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        setUserData(false)
        console.log(error)
      })

    axios({
      method: 'get',
      url: `/api/post/user/${username}`,
    })
      .then((response) => {
        const posts = response.data.map((post) => ({
          src: post.image_url,
          width: post.width,
          height: post.height,
        }))
        setPostCount(posts.length)
        setPostData(posts)
      })
      .catch((error) => {
        console.log(error)
      })

    axios({
      method: 'get',
      url: `/api/prompt/user/${username}`,
    })
      .then((response) => {
        setPromptCount(response.data.length)
        setPromptData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [username])

  return (
    <div className=" bg-fixed bg-contain bg-[url('/./src/assets/spacedoodle1.webp')]">
      <div className=" md:min-h-screen py-10">
        {userData && (
          <div className=" w-11/12 mx-auto py-10 bg-white bg-opacity-95 rounded-xl shadow-2xl  drop-shadow-2xl border border-#c4c9d28b mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-gray-700 text-xl">
                    {promptCount}
                  </p>
                  <p className="text-gray-400">Prompts</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">{postCount}</p>
                  <p className="text-gray-400">Posts</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">0</p>
                  <p className="text-gray-400">Comments</p>
                </div>
              </div>
              <div className="">
                <div className="mask mask-squircle w-48 h-48 bg-transparent mx-auto  inset-x-0 top-0  flex items-center justify-center text-indigo-500 avatar mt-24 md:-mt-24">
                  <img className="" src={userData.profileimage}></img>
                </div>
              </div>
              {!ownPage && (
                <div className="space-x-8 flex justify-around mt-32 md:mt-0 md:justify-center">
                  <button className="btn btn-primary border-none bg-primary hover:shadow-lg hover:shadow-[#6025F5]/50">
                    Connect
                  </button>
                  <button className="btn btn-secondary border-none hover:shadow-lg hover:shadow-[#6025F5]/50">
                    Message
                  </button>
                </div>
              )}
              {ownPage && (
                <div className="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">
                  <button
                    onClick={() => window.prompt_modal.showModal()}
                    className="btn btn-secondary border-none hover:shadow-lg hover:shadow-[#6025F5]/50"
                  >
                    New Prompt
                  </button>
                </div>
              )}
            </div>
            <div className="mt-5 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">
                {userData.username}
              </h1>
              <div className="mt-12 flex flex-col justify-center">
                <p className="text-gray-600 text-center font-light lg:px-16">
                  {userData.bio}
                </p>
              </div>
            </div>
            <div className="flex justify-center my-7">
              <div className="tabs tabs-boxed">
                <a
                  onClick={togglePost}
                  className={'tab tab-lg tab-lifted' + toggleView.postStat}
                >
                  Posts
                </a>
                <a
                  onClick={togglePrompt}
                  className={'tab tab-lg tab-lifted' + toggleView.promptStat}
                >
                  Prompts
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white bg-opacity-80 ">
          <div className={toggleView.postVis}>
            <Gallery photos={postData} layout="columns" />
          </div>
          <div
            className={
              'my-10 mx-5 flex flex-col gap-10 align-middle justify-evenly md:flex-wrap md:px-[3rem]' +
              toggleView.promptVis
            }
          >
            {promptData.map((prompt, i) => (
              <div
                key={i + 1}
                className="card max-w-96 bg-base-100 shadow-2xl drop-shadow-2xl"
              >
                <div className="card-body overflow-hidden break-words">
                  <h2 className="card-title text-primary">{prompt.title}</h2>
                  <p>{prompt.prompt_text}</p>
                  <div className="card-actions ssm:justify-between">
                    <span className="mt-auto italic">
                      {prompt.created_at.slice(0, 10)}
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
        {!userData && (
          <div className="flex justify-center w-11/12 mx-auto py-10 bg-white bg-opacity-95 rounded-xl shadow-2xl  drop-shadow-2xl border border-#c4c9d28b mt-24">
            <h1 className="text-3xl font-medium text-gray-700">
              This user doesnt exist...YET!
            </h1>
          </div>
        )}
      </div>
      <a href="https://www.freepik.com/free-vector/space-doodle_10837997.htm#query=doodles&position=34&from_view=search&track=sph">
        Image by tartila
      </a>{' '}
      on Freepik
      <Prompt_Modal />
    </div>
  )
}
