import { useState } from 'react'

import axios from 'axios'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import deleteIcon from '../assets/trash-bin-red-circle.png'
import { useCookies } from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

export default function ImageModal(props) {
  const [lightbox, setLightbox] = useState(false)
  const [cookies, setCookie] = useCookies()

  let modalUrl = `/prompt/${props.postData.promptId}/${props.postData.id}`
  window.history.pushState(null, '', modalUrl)

  function handleClose() {
    let newUrl = `/prompt/${props.postData.promptId}`
    window.history.pushState(null, '', newUrl)
    props.setPostData(null)
  }

  function handleDelete() {
    axios({
      method: 'delete',
      url: `/api/post/delete/${props.postData.id}`,
    })
      .then((response) => {
        document.getElementById('delete_modal').close()
        handleClose()
        props.setRender((p) => !p)
      })
      .catch((error) => {
        toast.error('Unable to delete post.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000, //5 seconds
          closeOnClick: true,
          pauseOnHover: true,
        })
        document.getElementById('delete_modal').close()
      })
  }

  return (
    <div>
      <dialog
        id="image_modal"
        className="w-full h-full fixed z-10 inset-0 flex justify-center items-center bg-transparent overflow-hidden p-0"
      >
        <div
          className=" fixed inset-0 bg-black opacity-75"
          onClick={() => handleClose()}
        />
        <div className="w-[92vw] relative flex flex-col justify-between md:flex-row rounded-lg overflow-hidden">
          <button
            onClick={() => handleClose()}
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
          <div className="min-h-[30vh] flex flex-col align-middle bg-black bg-opacity-100 md:w-[65%] md:max-h-[71vh]">
            {props.postData.username === cookies.username && (
              <button
                onClick={() =>
                  document.getElementById('delete_modal').showModal()
                }
                className=""
              >
                <img
                  className=" w-8 absolute ml-1 mt-1 hover:w-9 "
                  src={deleteIcon}
                ></img>
              </button>
            )}
            <img
              src={props.postData.src}
              className="max-h-[45vh] md:max-h-[71vh] m-auto p-auto hover:cursor-zoom-in"
              onClick={() => setLightbox(true)}
            />
          </div>
          <div className="min-h-[35vh] bg-gray-400 bg-opacity-100 bg-[url('/./src/assets/hello.jpg')]  h-[20vh]  md:h-auto  md:mt-0 md:w-[35%] md:max-h-[71vh] md:min-h-[60vh] ">
            <div className="bg-white h-14 border bottom-1 flex flex-row">
              <a href={`/user/${props.postData.username}`}>
                <img
                  className="mask mask-squircle h-12 mt-[2px]"
                  src={props.postData.profileImage}
                />
              </a>
              <span className="my-auto font-semibold">
                {props.postData.username}
              </span>
            </div>
            <div className="flex align-middle bg-white bg-opacity-95 h-full">
              <h3 className="font-semibold mt-auto">
                Comment section is under construction
              </h3>
            </div>
          </div>
        </div>
      </dialog>

      <Lightbox
        slides={[props.postData]}
        open={lightbox}
        close={() => setLightbox(false)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Zoom]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        controller={{
          closeOnPullDown: true,
        }}
        on={{
          entering: () => {
            console.log(props.postData.src)
            window.image_modal.close()
          },
          exiting: () => window.image_modal.showModal(),
        }}
      />

      <dialog
        id="delete_modal"
        className="rounded-md shadow-2xl drop-shadow-2xl border-dashed border-2 border-yellow-500 "
      >
        <div className="">
          <h3 className="font-bold text-lg">Delete Post?</h3>
          <p className="py-4">Are you sure you want to delete this Post?</p>
          <div className="flex justify-between">
            <button
              className="btn btn-outline min-w-[120px]"
              onClick={() => document.getElementById('delete_modal').close()}
            >
              No
            </button>
            <button
              onClick={() => handleDelete()}
              className="btn btn-warning min-w-[120px]"
            >
              Yes
            </button>
          </div>
        </div>
      </dialog>

      <ToastContainer />
    </div>
  )
}
