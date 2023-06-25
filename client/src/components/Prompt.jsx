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
          <div className="w-[85vw] mx-auto mb-[65px] bg-white bg-opacity-95 rounded-xl shadow-xl  drop-shadow-2xl border border-#c4c9d28b min-h-[35vh] flex flex-col md:flex-row md:w-9/12">
            <div className="m-5 md:w-[70%]">
              <h2 className=" text-2xl font-semibold leading-7 mb-3">
                PROMPT:
              </h2>
              <p className=" text-xl font-semibold leading-10 ">
                {prompt} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Accusamus laboriosam repellat blanditiis maxime fugit.
                Blanditiis, officiis error qui, corrupti in dolorum, nam ipsum
                neque est a quam architecto odio velit?
              </p>
            </div>
            <div className=" m-2 py-2 rounded-xl border border-#c4c9d28b  md:w-[40%]  md:m-5 md:ml-0">
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
