import Login from './Login'
import Navbar from './Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  let navigate = useNavigate()

  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    conPassword: '',
    email: '',
  })

  function handleInput(event) {
    setSignupData({ ...signupData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios({
      method: 'post',
      url: '/api/auth/signup',
      data: signupData,
    })
      .then((response) => {
        // setResponse(response.data)
        console.log(response.data)
        if (response.data.error) {
          console.log(...response.data.error)
        }
        if (response.data.signup === 'successful') {
          navigate('/')
          navigate(0)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <>
      <Navbar />
      <Login />
      <div className="bg-contain bg-repeat  bg-[url('https://img.freepik.com/free-vector/space-doodle_102902-2356.jpg?w=2000&t=st=1685933525~exp=1685934125~hmac=401d6b362f5d5b9ceb80eb3b64b19a881c43804d4af94d790c3a89e2141063df')]">
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
          <div className="w-11/12 p-6 m-auto bg-white rounded-lg shadow-2xl drop-shadow-2xl sm:max-w-lg">
            <h1 className="text-3xl font-semibold text-center ">
              Create an Account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="text-base label-text">Username</span>
                </label>
                <input
                  onChange={handleInput}
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="w-full input input-bordered input-primary"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text">Email</span>
                </label>
                <input
                  onChange={handleInput}
                  name="email"
                  type="text"
                  placeholder="Email Address"
                  className="w-full input input-bordered input-primary"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text">Password</span>
                </label>
                <input
                  onChange={handleInput}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base label-text">Confirm Password</span>
                </label>
                <input
                  onChange={handleInput}
                  name="conPassword"
                  type="password"
                  placeholder="Re-Enter Password"
                  className="w-full input input-bordered input-primary"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="border-none btn btn-block bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-[#6025F5]/50"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <a href="https://www.freepik.com/free-vector/space-doodle_10837997.htm#query=doodles&position=34&from_view=search&track=sph">
            Image by tartila
          </a>{' '}
          on Freepik
        </div>
      </div>
    </>
  )
}
