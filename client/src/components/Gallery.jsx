import PhotoAlbum from 'react-photo-album'
import photos from './photos'

export default function Gallery(props) {
  return (
    <div className="m-6 ">
      <PhotoAlbum layout="columns" photos={photos} />
    </div>
  )
}
