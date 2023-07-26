import Gallery from './Gallery'
import { useState } from 'react'

export default function Prompt() {
  const [prompt, setPrompt] = useState('Ready, Get Set.........DRAW!')
  return (
    <div className="bg-[url('./src/assets/im3.jpg')] bg-opacity-10 ">
      <div className="bg-white bg-opacity-90">
        <div className="min-h-screen py-[4vw]  ">
          <div className="w-[85vw] mx-auto mb-[65px] bg-white bg-opacity-95 rounded-xl shadow-xl  drop-shadow-2xl border border-#c4c9d28b  lg:min-h-[20vw] flex flex-col-reverse lg:flex-row lg:w-[60vw]">
            <div className="m-[2vh] mb-0 lg:w-[70%] relative flex flex-col justify-between lg:mb-[1vw]">
              <h2 className="font-semibold leading-[4vw] text-[3vh]">
                PROMPT:
              </h2>
              <p className="font-semibold leading-[3.5vh] mt-[1vh] text-[2vh] mb-[2vw] lg:text-[1.2vw] lg:leading-[3vw]">
                {prompt} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Accusamus laboriosam repellat blanditiis maxime fugit.
                Blanditiis, officiis error qui, corrupti in dolorum, nam ipsum
                neque est a quam architecto odio velit?
              </p>
              <button className="btn btn-primary btn-block mb-[2vw] border-none bg-gradient-to-b from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-[#6025F5]/50 h-[3vw] text-[1.5vh] lg:mb-[0] ">
                {' '}
                Submit your Art!
              </button>
            </div>
            <div className="m-[2vw] mb-0 py-2 rounded-xl border border-#c4c9d28b lg:w-[20vw]  lg:m-[1vw] lg:ml-0 lg:min-h-[20vw]">
              <img
                className="h-[4vw] min-h-[4rem] mask mask-squircle overflow-hidden flex-start"
                src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/052967c305a8f96a4b40b79ce5e61b0d.png"
              />
            </div>
          </div>
          <Gallery layout="columns" />
        </div>
      </div>
    </div>
  )
}
