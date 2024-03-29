import { useNavigate } from 'react-router-dom'
import Login_Modal from './Login_Modal'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Navbar(props) {
  const [userData, setUserData] = useState({})
  let navigate = useNavigate()
  let avatarVis
  let loginVis

  if (props.cookies.username != undefined) {
    loginVis = 'hidden '
    avatarVis = ''
  } else {
    loginVis = ''
    avatarVis = 'hidden '
  }

  function handleClick(event) {
    event.preventDefault()
    axios({
      method: 'get',
      url: '/api/auth/logout',
    })
      .then((response) => {
        console.log(response.data)
        navigate('/')
        navigate(0)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    if (props.cookies.username) {
      axios({
        method: 'get',
        url: `/api/user/${props.cookies.username}`,
      })
        .then((response) => {
          setUserData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [props.cookies.usernam, props.render])

  return (
    //TODO: hide profile image if user not logged in, and replace with 'login/signup'
    //TODO: add user specific profile pic from url stored in DB
    <>
      <nav className="navbar z-10 bg-base-100 drop-shadow-md relative h-[6vh]">
        <div className="flex-1">
          <a
            href="/"
            className="btn btn-ghost normal-case leading-[1vh] text-[1.6rem] font-pacifico"
          >
            Illustray
          </a>
        </div>
        <div className="flex-none gap-3">
          {/* The button to open modal */}
          <div className={loginVis}>
            <button
              onClick={() => window.login_modal.showModal()}
              className="btn  h-9 min-h-full bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-[#6025F5]/50 border-none"
            >
              Login
            </button>
          </div>
          <div className={loginVis}>
            <a href="/signup" className="btn btn-ghost h-9 min-h-full">
              Sign Up
            </a>
          </div>

          <div className={avatarVis + 'dropdown dropdown-end pr-4 '}>
            <label
              tabIndex={0}
              className="rounded-2xl avatar btn-ghost shadow-md hover:shadow-[#6025F5]/50 border-none "
            >
              <div className="w-12 mask mask-squircle">
                <img className="inline-block" src={userData.profileimage} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  href={`/user/${props.cookies.username}`}
                  className="justify-between"
                >
                  Profile
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              <li>
                <a href={`/user/${props.cookies.username}/settings`}>
                  Settings
                </a>
              </li>
              <li>
                <button onClick={handleClick}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Login_Modal />
    </>
  )
}
