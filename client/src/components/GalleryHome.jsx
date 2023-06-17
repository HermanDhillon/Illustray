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
        className="drop-shadow-2xl shadow-2xl rounded-xl w-[100rem] overflow-hidden "
      >
        <div className="flex flex-col justify-between mx-auto md:flex-row">
          <button
            onClick={() => window.image_modal.close()}
            className="btn btn-sm btn-circle absolute right-2 top-2 border-none"
          >
            ✘
          </button>
          <div className="h-[50%] md:w-[60%] rounded-xl bg-slate-500 bg-opacity-10">
            <img
              src={source}
              className="rounded-xl max-h-[40rem] md:max-h-[40rem] mx-auto"
            ></img>
          </div>
          <div className="min-h-[100px] mt-5 rounded-xl border border-#c4c9d28b md:ml-5 md:mt-0 md:w-[40%] ">
            <h3>Comments</h3>
          </div>
        </div>
      </dialog>
    </>
  )
}
