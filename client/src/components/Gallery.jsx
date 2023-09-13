import PhotoAlbum from 'react-photo-album'
import LoginModal from './Login_Modal'

export default function Gallery(props) {
  return (
    <div className="">
      <PhotoAlbum
        className="border-8 border-solid border-red-500"
        layout={props.layout}
        columns={(containerWidth) => {
          if (containerWidth < 300) return 1
          if (containerWidth < 500) return 2
          if (containerWidth < 700) return 3
          if (containerWidth < 930) return 4
          return 5
        }}
        photos={props.postData}
        componentsProps={() => ({
          containerProps: {
            className: 'my-10 w-11/12 mx-auto',
          },
          imageProps: {
            className:
              ' rounded-md shadow-lg drop-shadow-lg overflow-hidden transistion transform hover:-translate-y-1 hover:brightness-50 duration-300 hover:rounded-none duration-300',
          },
        })}
        onClick={({ photo }) => console.log(photo)}
      />
      <LoginModal />
    </div>
  )
}
