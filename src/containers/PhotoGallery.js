import React, { Component } from 'react'
import Gallery from 'react-photo-gallery'
import photos from '../utils/PhotoGalleryUtils'
import InlineMessage from '../components/InlineMessage'

class PhotoGallery extends Component {
  renderError() {
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
            this.renderError()
          }
        </div>
      </div>
    )
  }
}
export default PhotoGallery