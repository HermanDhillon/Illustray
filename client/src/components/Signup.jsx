import Login from './Login'
import Navbar from './Navbar'

export default function Signup() {
  return (
    <>
      <Navbar />
      <Login />
      <div className="bg-[url('../../Images/Backgrounds/Signup.webp')]  bg-contain bg-repeat">
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-lg shadow-2xl drop-shadow-2xl lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center ">
              Create an Account
            </h1>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="text-base label-text">Username</span>
                </label>
                <input
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
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base label-text">
                    Re-Enter Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Re-Enter Password"
                  className="w-full input input-bordered input-primary"
                />
              </div>
              <div>
                <button className="border-none btn btn-block bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:(bg-gradient-to-b from-violet-500 to-fuchsia-100)">
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
