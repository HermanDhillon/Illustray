import PhotoAlbum from 'react-photo-album'
import ImageModal from './Image_Modal'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Gallery(props) {
  let navigate = useNavigate()

  const [postData, setPostData] = useState(null)

  useEffect(() => {
    if (props.postId && props.postsData) {
      let singlePost = props.postsData?.filter((e) => e.id == props.postId)
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
          if (props.link) {
            navigate(`/prompt/${photo.promptId}/${photo.id}`)
          } else {
            setPostData(photo)
          }
        }}
      />
      {postData && (
        <ImageModal
          link={props.link}
          setPostData={setPostData}
          postData={postData}
          setRender={props.setRender}
        />
      )}
    </div>
  )
}
