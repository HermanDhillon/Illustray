import React, { useEffect } from 'react'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import XHR from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'
import Compressor from '@uppy/compressor'
// import ImageEditor from '@uppy/image-editor'

// // Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/webcam/dist/style.min.css'

export default function Uploader(props) {
  // Don’t forget to keep the Uppy instance outside of your component.
  const uppy = new Uppy({
    restrictions: {
      maxFileSize: 10000000, //10MB
      allowedFileTypes: ['image/*'],
      maxNumberOfFiles: 1,
    },
  })
    .use(Webcam)
    .use(Compressor)
    .use(XHR, { endpoint: props.uploadUrl })
    .on('complete', () => {
      props.setCount(p => p+1)
      setTimeout(() => {
        window.upload_modal.close()
      }, 1000)
    })
  // .use(ImageEditor, {
  //   cropperOptions: {
  //     viewMode: 1,
  //     background: false,
  //     autoCropArea: 1,
  //     responsive: true,
  //     croppedCanvasOptions: {},
  //   },
  //   actions: {
  //     revert: true,
  //     rotate: true,
  //     granularRotate: true,
  //     flip: true,
  //     zoomIn: true,
  //     zoomOut: true,
  //     cropSquare: true,
  //     cropWidescreen: true,
  //     cropWidescreenVertical: true,
  //   },
  // })

  return (
    <dialog className="z-10 p-0 rounded-lg" id="upload_modal">
      <div
        className="-z-10 fixed inset-0 bg-black opacity-75"
        onClick={() => window.upload_modal.close()}
      />
      <div>
        <button
          onClick={() => window.upload_modal.close()}
          className="z-10 btn btn-sm btn-circle btn-outline absolute right-2 top-2"
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

        <Dashboard uppy={uppy} plugins={['Webcam']} />
      </div>
    </dialog>
  )
}
