import Footer from './Footer'
import Navbar from './Navbar'

export default function Profile() {
  return (
    <div className="bg-contain bg-repeat  bg-[url('./src/assets/SpaceDoodleC.webp')]">
      <Navbar />
      <div className=" md:min-h-screen ">
        <div className="w-11/12 m-auto p-8 bg-white bg-opacity-95 rounded-xl shadow-2xl  drop-shadow-2xl border border-#c4c9d28b mt-24">
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {' '}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {' '}
              <div>
                {' '}
                <p className="font-bold text-gray-700 text-xl">22</p>{' '}
                <p className="text-gray-400">Friends</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className="font-bold text-gray-700 text-xl">10</p>{' '}
                <p className="text-gray-400">Photos</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className="font-bold text-gray-700 text-xl">89</p>{' '}
                <p className="text-gray-400">Comments</p>{' '}
              </div>{' '}
            </div>{' '}
            <div className="relative">
              {' '}
              <div className=" mask mask-squircle w-48 h-48 bg-indigo-100 mx-auto shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 avatar">
                <img src="./src/assets/userAstronaut.png" className=""></img>{' '}
              </div>{' '}
            </div>{' '}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="btn btn-primary border-none bg-primary hover:shadow-lg hover:shadow-[#6025F5]/50">
                {' '}
                Connect
              </button>{' '}
              <button className="btn btn-secondary border-none hover:shadow-lg hover:shadow-[#6025F5]/50">
                {' '}
                Message
              </button>{' '}
            </div>{' '}
          </div>{' '}
          <div className="mt-20 text-center border-b pb-12">
            {' '}
            <h1 className="text-4xl font-medium text-gray-700">
              Sudo Mateo, <span className="font-light text-gray-500">27</span>
            </h1>{' '}
            <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>{' '}
            <p className="mt-8 text-gray-500">Digital Artist</p>{' '}
            <p className="mt-2 text-gray-500">University of Computer Science</p>{' '}
          </div>{' '}
          <div className="mt-12 flex flex-col justify-center">
            {' '}
            <p className="text-gray-600 text-center font-light lg:px-16">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>{' '}
            <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
              {' '}
              Show more
            </button>{' '}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
