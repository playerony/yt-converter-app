import React, { Component } from 'react'
import onConvertVideo from '../utils/VideoConvertUtils'
import {
  Player, 
  ControlBar, 
  PlaybackRateMenuButton, 
  VolumeMenuButton,
  BigPlayButton,
  LoadingSpinner,
  ForwardControl
} from 'video-react'
import Button from '../components/Button'
import SelectVideoForm from '../components/SelectVideoForm'
import '../../node_modules/video-react/dist/video-react.css'

class VideoConverterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      video: null,
      videoFileName: null,
      convertTo: 'mp4'
    }

    this.onChange = this.onChange.bind(this)
    this.onConvert = this.onConvert.bind(this)
    this.onVideoSelect = this.onVideoSelect.bind(this)
  }

  onVideoSelect(selectedFile) {
    this.setState({
      video: require('../other/videos/' + selectedFile.name),
      videoFileName: selectedFile.name
    })
  }

  onChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value 
    })
  }

  onConvert() {
    onConvertVideo(this.state.videoFileName, this.state.convertTo)
  }

  render() {
    return (
      <div className="container">
        {this.state.video === null ?
          <div>
            <SelectVideoForm onVideoSelect={this.onVideoSelect} />
          </div>
        :
          <div>
            <main>
              <div>
                <Player ref="player" className="player" autoplay playsInline fluid={false} width={500} height={300}>
                  <source src={this.state.video} />
                  <BigPlayButton position="center" />
                  <LoadingSpinner />
                  <ControlBar>
                    <PlaybackRateMenuButton rates={[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]} order={7.1} />
                    <VolumeMenuButton />
                    <ForwardControl seconds={5} order={7.1} />
                  </ControlBar>
                </Player>
              </div>

              <div className="options" value={this.state.convertTo}>
                <select name="convertTo" onChange={this.onChange}>
                  <option value="mp4" disabled defaultValue>Download As...</option>
                  <option value="mp4">MP4</option>
                  <option value="mp3">MP3</option>
                  <option value="avi">AVI</option>
                </select>
                <Button onClick={this.onConvert} name="Convert" />
              </div>
            </main>
          </div>
        }
      </div>
    )
  }
}
export default VideoConverterPage