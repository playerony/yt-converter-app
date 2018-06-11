import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import fileDownload from 'react-file-download'
import Button from '../components/Button'
import '../styles/VideoThumbnail.css'

class VideoTumbnail extends Component {
  constructor(props) {
    super(props)

    this.state = {
        itag: -1
    }

    this.onChange = this.onChange.bind(this)
    this.onConvert = this.onConvert.bind(this)
  }

  onChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value,
      itag: e.target.value
    })
  }

  onConvert() {
    const { itag } = this.state
    const { videoInfo } = this.props

    let element = videoInfo.filter((tag) => {
        return tag.itag === itag; 
    })

    fileDownload(element[0].url, `${new Date()}.ogv`)
  }

  render() {
    const { videoDetails, videoUrls } = this.props

    let selectOptions = videoUrls.map(info => {
      let type = ''
      if(info.type !== undefined)
          type = info.type.split(';').shift()

      return <option value={info.itag} key={info.itag}>{`Quality: ${info.quality} / Format: ${type}`}</option>
    })

    return (
      <div className="container">
        <div className="description">
          <div style={{ background: `url(${videoDetails.thumbnail_url}) center center`,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} className="videoImg"></div>
          <div className="videoDescription">
            <h1>{videoDetails.title}</h1>
            <p>Video author: <a href={videoDetails.author_url}>{videoDetails.author_name}</a></p>
          </div>
        </div>

        <div className="options">
          <select onChange={this.onChange} >
            <option disabled defaultValue>Download As...</option>
            {selectOptions.length > 0 && selectOptions[0].key !== null ?
              selectOptions
            :
              <option defaultValue>You can't download this video</option>
            }
          </select>
          <Button name="Convert" onClick={this.onConvert} />
        </div>
      </div>
    )
  }
}

VideoTumbnail.propTypes = {
  videoDetails: PropTypes.object.isRequired,
  videoInfo: PropTypes.array.isRequired
}

export default VideoTumbnail