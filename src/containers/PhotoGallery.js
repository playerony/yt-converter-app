import React, { Component } from 'react'
import Gallery from 'react-photo-gallery'
import photos from '../utils/PhotoGalleryUtils'
import InlineMessage from '../components/InlineMessage'

class PhotoGallery extends Component {
  renderMessage() {
    return <InlineMessage message="There are no photos to show"
                          className="info" />
  }

  render() {
    return (
      <div className="container">
        <div className="gallery">
          {photos.length > 0 ?
            <Gallery photos={photos} margin={15} />
          :
            this.renderMessage()
          }
        </div>
      </div>
    )
  }
}
export default PhotoGallery