import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function Navbar() {
  const [cookies, setCookie] = useCookies('userid')
  cookies.userid = 0 // for testing userid cookie presence
  let avatarVis = cookies.userid ? '' : 'hidden '
  let loginVis = cookies.userid ? 'hidden ' : ''

  return (
    //TODO: hide profile image if user not logged in, and replace with 'login/signup'
    //TODO: add user specific profile pic from url stored in DB
    <nav className="navbar bg-base-100 drop-shadow-md">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Illustray
        </a>
      </div>
      <div className="flex-none gap-3">
        {/* The button to open modal */}
        <div className={loginVis}>
          <a
            href="#Login"
            className="btn btn-primary animate-pulse h-9 min-h-full"
          >
            Login
          </a>
        </div>
        <div className={loginVis}>
          <a href="/Signup" className="btn btn-ghost h-9 min-h-full">
            Sign Up
          </a>
        </div>

        <div className={avatarVis + 'dropdown dropdown-end'}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/052967c305a8f96a4b40b79ce5e61b0d.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
