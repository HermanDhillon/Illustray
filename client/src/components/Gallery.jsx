import PhotoAlbum from 'react-photo-album'
import ImageModal from './Image_Modal'
import { useState, useEffect } from 'react'

export default function Gallery(props) {
  const [postData, setPostData] = useState(null)

  useEffect(() => {
    if (props.postId && props.postsData) {
      let singlePost = props.postsData?.filter((e) => e.id == props.postId)
      console.log('SINGLE POST', singlePost)
      setPostData(singlePost[0])
    }
  }, [props.postsData])
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
        photos={props.postsData}
        componentsProps={() => ({
          containerProps: {
            className: 'my-10 w-11/12 mx-auto',
          },
          imageProps: {
            className:
              ' rounded-md shadow-lg drop-shadow-lg overflow-hidden transistion transform hover:-translate-y-1 hover:brightness-50 duration-300 hover:rounded-none duration-300',
          },
        })}
        onClick={({ photo }) => {
          setPostData(photo)
          let newUrl = `/prompt/${photo.promptId}/${photo.id}`
          window.history.pushState(null, '', newUrl)
        }}
      />
      {postData && <ImageModal setPostData={setPostData} postData={postData} />}
    </div>
  )
}
