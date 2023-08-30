import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Prompt_Modal() {
  let navigate = useNavigate()

  const [promptData, setPromptData] = useState({
    title: '',
    promptText: '',
  })

  function handleInput(event) {
    setPromptData({ ...promptData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios({
      method: 'post',
      url: '/api/prompt',
      data: promptData,
    })
      .then((response) => {
        // redirect if successful
        navigate(`/prompt/${response.data.id}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <dialog
      className="w-11/12 border border-#c4c9d28b rounded-lg lg:w-4/12"
      id="prompt_modal"
    >
      <div
        className="-z-10 inset-0 fixed"
        onClick={() => window.prompt_modal.close()}
      />
      <div className="">
        <button
          onClick={() => window.prompt_modal.close()}
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
        <h1 className="text-3xl font-semibold text-center mb-5 text-gray-700">
          New Prompt
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Title</span>
            </label>
            <input
              required
              type="text"
              placeholder="Title"
              className="w-full text-xl input input-bordered input-primary"
              name="title"
              onChange={handleInput}
            />
          </div>
          <div>
            <textarea
              required
              type="text"
              placeholder="Write your Prompt here"
              className="text-xl w-full min-h-[150px] input input-primary textarea-bordered"
              name="promptText"
              onChange={handleInput}
            />
          </div>

          <div>
            <button
              type="submit"
              className=" btn btn-primary btn-block border-none bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-[#6025F5]/50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
