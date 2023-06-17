import PhotoAlbum from 'react-photo-album'
import photos from './photos'

import 'yet-another-react-lightbox/plugins/thumbnails.css'

import { useState } from 'react'

export default function GalleryHome(props) {
  const [source, setSource] = useState(null)
  function handleClick(image) {
    setSource(image.src)
    console.log(image)
    window.image_modal.showModal()
  }
  return (
    <>
      <PhotoAlbum
        layout="columns"
        columns={(containerWidth) => {
          if (containerWidth < 300) return 1
          if (containerWidth < 500) return 2
          if (containerWidth < 700) return 3
          if (containerWidth < 930) return 4
          return 5
        }}
        absolute
        photos={photos}
        componentsProps={() => ({
          containerProps: {
            className: 'my-10 w-11/12 mx-auto',
          },
          imageProps: {
            className: ' rounded-lg shadow-lg drop-shadow-lg overflow-hidden',
          },
        })}
        onClick={({ photo }) => handleClick(photo)}
      />

      <dialog
        id="image_modal"
        className="drop-shadow-2xl shadow-2xl rounded-xl w-[100rem] max-h-[80vh] overflow-hidden "
      >
        <div className="flex flex-col justify-between my-[2.5vh] mx-auto md:flex-row">
          <button
            onClick={() => window.image_modal.close()}
            className="btn btn-sm btn-circle absolute right-2 top-2 border-none"
          >
            ✘
          </button>
          <div className=" flex flex-col align-middle rounded-xl bg-slate-500 bg-opacity-10 md:w-[65%] md:max-h-[71vh]">
            <img
              src={source}
              className="rounded-xl max-h-[45vh] md:max-h-[71vh] m-auto p-auto"
            ></img>
          </div>
          <div className="mt-5 max-h-[40vh] rounded-xl border border-#c4c9d28b md:ml-5 md:mt-0 md:w-[35%] md:max-h-[71vh] ">
            <h3>Comments</h3>
          </div>
        </div>
      </dialog>
    </>
  )
}
