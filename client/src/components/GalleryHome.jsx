import PhotoAlbum from 'react-photo-album'
import photos from './photos'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import { useState } from 'react'

export default function GalleryHome(props) {
  const [source, setSource] = useState(null)
  const [lightbox, setLightbox] = useState(false)

  function handleClick(image) {
    setSource(image)
    window.image_modal.showModal()
  }

  return (
    <div>
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
        className="drop-shadow-2xl shadow-2xl rounded-xl w-[100rem] max-h-[80vh] overflow-hidden md:max-h-[90vh] z-0"
      >
        <div className="flex flex-col justify-between  mx-auto md:flex-row">
          <button
            onClick={() => window.image_modal.close()}
            className="btn btn-sm btn-circle absolute right-2 top-2 border-none"
          >
            ✘
          </button>
          <div className=" flex flex-col align-middle rounded-xl bg-gray-400 bg-opacity-10 md:w-[65%] md:max-h-[71vh]">
            <img
              src={source?.src}
              className="rounded-xl max-h-[45vh] md:max-h-[71vh] m-auto p-auto"
              onClick={() => setLightbox(true)}
            ></img>
          </div>
          <div className="bg-gray-400 bg-opacity-10 mt-5 h-[20vh] rounded-xl border border-#c4c9d28b md:h-auto md:ml-5 md:mt-0 md:w-[35%] md:max-h-[71vh] md:min-h-[60vh] ">
            <h3>Comments</h3>
          </div>
        </div>
      </dialog>

      <Lightbox
        className="z-50"
        slides={[source]}
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
          entering: () => window.image_modal.close(),
          exiting: () => window.image_modal.showModal(),
        }}
      />
    </div>
  )
}
