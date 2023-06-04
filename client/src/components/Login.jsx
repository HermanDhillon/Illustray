export default function Login() {
  return (
    <div className="modal" id="Login">
      <div className="modal-box">
        <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
          ✘
        </a>
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forgot Password?
          </a>
          <div>
            <button className="btn btn-primary btn-block">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
