import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login_Modal() {
  let navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })

  function handleInput(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios({
      method: 'post',
      url: '/api/auth/login',
      data: loginData,
    })
      .then((response) => {
        // setResponse(response.data)
        if (response.data.error) {
          console.log(response.data.error)
        }
        if (response.data.login === 'successful') {
          window.login_modal.close()
          if (window.location.pathname === '/signup') {
            navigate('/') // <-- redirect
            navigate(0)
          } else {
            navigate(0) // <-- refresh
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <dialog
      className="modal-box shadow-2xl  drop-shadow-2xl border border-#c4c9d28b"
      id="login_modal"
    >
      <div className="">
        <button
          onClick={() => window.login_modal.close()}
          className="btn btn-sm btn-circle btn-outline absolute right-2 top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered input-primary"
              name="username"
              onChange={handleInput}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              name="password"
              onChange={handleInput}
            />
          </div>
          <a
            href="https://media.tenor.com/OoTeyZ1HtIkAAAAC/welp.gif"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600 "
          >
            Forgot Password?
          </a>
          <div>
            <button
              type="submit"
              className=" btn btn-primary btn-block border-none bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-[#6025F5]/50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
