import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function User(props) {
  let [userData, setUserData] = useState({
    username: 'Loading...',
    bio: 'Loading...',
  })
  const { username } = useParams()
  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/user/${username}`,
    })
      .then((response) => {
        console.log(response.data)
        setUserData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [username])

  let ownPage = props.cookies.username == username

  return (
    <div className="bg-contain bg-repeat  bg-[url('/./src/assets/spacedoodle1.webp')]">
      <div className=" md:min-h-screen py-10">
        {userData && (
          <div className=" w-11/12 mx-auto py-10 bg-white bg-opacity-95 rounded-xl shadow-2xl  drop-shadow-2xl border border-#c4c9d28b mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-gray-700 text-xl">22</p>
                  <p className="text-gray-400">Friends</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">10</p>
                  <p className="text-gray-400">Photos</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">89</p>
                  <p className="text-gray-400">Comments</p>
                </div>
              </div>
              <div className="">
                <div className="mask mask-squircle w-48 h-48 bg-indigo-100 mx-auto absolute inset-x-0 top-0  flex items-center justify-center text-indigo-500 avatar mt-24 md:-mt-24">
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
                  <button className="btn btn-secondary border-none hover:shadow-lg hover:shadow-[#6025F5]/50">
                    New Prompt
                  </button>
                </div>
              )}
            </div>
            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">
                {userData.username}
              </h1>
              <p className="font-light text-gray-600 mt-3">Citysville, USA</p>
              <p className="mt-8 text-gray-500">Title</p>
              <p className="mt-2 text-gray-500">Company Name</p>
            </div>
            <div className="mt-12 flex flex-col justify-center">
              <p className="text-gray-600 text-center font-light lg:px-16">
                {userData.bio}
              </p>
              <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
                Show more
              </button>
            </div>
          </div>
        )}
        {!userData && (
          <div className="flex justify-center w-11/12 mx-auto py-10 bg-white bg-opacity-95 rounded-xl shadow-2xl  drop-shadow-2xl border border-#c4c9d28b mt-24">
            <h1 className="text-3xl font-medium text-gray-700">
              This user doesnt exist...YET!
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
