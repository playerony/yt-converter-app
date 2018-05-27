import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchVideoDownloadUrls, resetVideoDownloadUrls, fetchVideoDetailsByUrl } from '../actions/youtube.action'
import SearchBar from '../components/SearchBar'
import InlineMessage from '../components/InlineMessage'
import VideoThumbnail from './VideoThumbnail'

class DownloadVideoPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingForVideo: false,
      invalidLink: false,
      videoUrl: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(videoUrl) {
    const { dispatch } = this.props

    dispatch(resetVideoDownloadUrls())
    dispatch(fetchVideoDownloadUrls(videoUrl))
    dispatch(fetchVideoDetailsByUrl(videoUrl))

    this.setState({ loadingForVideo: true, videoUrl })
  }

  renderLoading() {
    return <InlineMessage message="Waiting for video info..."
                          className="info" />
  }

  renderError() {
    return <InlineMessage message="Link is invalid"
                          className="error" />
  }

  renderError(errorMessage) {
    if(errorMessage.includes('<a href'))
      errorMessage = errorMessage.split('<a href').shift()

    return <InlineMessage message={errorMessage}
                          className="error" />
  }

  render() {
    const { videoUrls, videoDownloadError, isVideoDownloadError, isVideoDownloadFetching, details } = this.props

    return (
      <div>
        <SearchBar onSubmit={this.onSubmit} />

        { !isVideoDownloadError ?
          (this.state.loadingForVideo === true && 
          (!isVideoDownloadFetching && Object.keys(videoUrls).length > 0 ? <VideoThumbnail videoDetails={details.details} videoUrls={videoUrls}/> : this.renderLoading()))
        : 
          <div>
            {Object.keys(videoDownloadError).length > 0 ?
              this.renderError(videoDownloadError) 
            :
              this.renderError()
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    videoUrls: state.videoUrls.videoUrls,
    videoDownloadError: state.videoUrls.error,
    isVideoDownloadError: state.videoUrls.isError,
    isVideoDownloadFetching: state.videoUrls.isFetching,
    details: state.videoDetails
  }
}

export default connect(mapStateToProps) (DownloadVideoPage)
