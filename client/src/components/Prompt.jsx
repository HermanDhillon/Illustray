import Footer from './Footer'
import Gallery from './Gallery'
import Navbar from './Navbar'
import { useState } from 'react'

export default function Prompt() {
  const [prompt, setPrompt] = useState('Ready, Get Set.........DRAW!')
  return (
    <div className="bg-[url('./src/assets/im3.jpg')] bg-opacity-10 ">
      <div className="bg-white bg-opacity-90">
        <Navbar />
        <div className="min-h-screen py-10  ">
          <div className="w-[85vw] mx-auto mb-[65px] bg-white bg-opacity-95 rounded-xl shadow-xl  drop-shadow-2xl border border-#c4c9d28b  md:min-h-[20vw] flex flex-col md:flex-row md:w-9/12">
            <div className="m-[1vw] mb-0 md:w-[70%] relative flex flex-col align-top md:mb-[1vw]">
              <h2 className="font-semibold leading-[4vw] mb-[1vh] text-[3vh]">
                PROMPT:
              </h2>
              <p className="font-semibold leading-[4vh] text-[2vh] mb-[4vw]">
                {prompt} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Accusamus laboriosam repellat blanditiis maxime fugit.
                Blanditiis, officiis error qui, corrupti in dolorum, nam ipsum
                neque est a quam architecto odio velit?
              </p>
              <button className="btn btn-primary btn-block  inset-x-0 bottom-0 h-[3vw] text-[1.5vh]">
                {' '}
                Submit your Art!
              </button>
            </div>
            <div className=" m-[0.5vw] py-2 rounded-xl border border-#c4c9d28b md:w-[20vw]  md:m-[1vw] md:ml-0 md:min-h-[20vw]">
              <img
                className="h-[4vw] min-h-[4rem] mask mask-squircle overflow-hidden flex-start"
                src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/052967c305a8f96a4b40b79ce5e61b0d.png"
              />
            </div>
          </div>
          <Gallery layout="columns" />
        </div>
        <Footer />
      </div>
    </div>
  )
}
