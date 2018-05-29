import React, { Component } from 'react'
import CaptureVideoFrame from '../utils/CaptureVideoFrame'
import fileDownload from 'react-file-download'
import { Player, 
         ControlBar, 
         PlaybackRateMenuButton, 
         VolumeMenuButton,
         BigPlayButton,
         LoadingSpinner,
         ForwardControl
} from 'video-react'
import Button from '../components/Button'
import VideoScreenshotCanvas from '../components/VideoScreenshotCanvas'
import SelectVideoForm from '../components/SelectVideoForm'
import '../../node_modules/video-react/dist/video-react.css'
import '../styles/VideoEditorPage.css'

class VideoEditorPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      frame: null,
      video: null,
    }

    this.onClick = this.onClick.bind(this)
    this.onScreenshotSaveClick = this.onScreenshotSaveClick.bind(this)
    this.onInputFileChange = this.onInputFileChange.bind(this)
    this.onVideoSelect = this.onVideoSelect.bind(this)
  }

  onVideoSelect(selectedFile) {
    this.setState({
      video: require('../other/videos/' + selectedFile.name)
    })
  }

  onClick() {
    this.setState({
      frame: CaptureVideoFrame(this.refs.player.video.video)
    })
  }

  onScreenshotSaveClick() {
    fileDownload(this.state.frame.blob, `${new Date()}.png`)
  }

  onInputFileChange(e) {
    this.setState({
      src: e.target.value
    })
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
            <main className="mainSection">
              <div className="videoSection">
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

              <div className="screenSection">
                <VideoScreenshotCanvas frame={this.state.frame} />
              </div>
            </main>

            <Button onClick={this.onClick} name="Screenshot" />
            <Button onClick={this.onScreenshotSaveClick} name="Save" />
          </div>
        }
      </div>
    )
  }
}
export default VideoEditorPage