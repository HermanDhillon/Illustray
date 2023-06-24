import PhotoAlbum from 'react-photo-album'
import photos from './photos'

export default function Gallery(props) {
  return (
    <PhotoAlbum
      layout="columns"
      columns={(containerWidth) => {
        if (containerWidth < 300) return 1
        if (containerWidth < 500) return 2
        if (containerWidth < 700) return 3
        if (containerWidth < 930) return 4
        return 5
      }}
      photos={photos}
      componentsProps={() => ({
        containerProps: {
          className: 'my-10 w-11/12 mx-auto',
        },
        imageProps: {
          className: ' rounded-lg shadow-lg drop-shadow-lg overflow-hidden',
        },
      })}
    />
  )
}
