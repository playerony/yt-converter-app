import React, { Component } from 'react'
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

    this.poll = this.poll.bind(this)
    this.onChange = this.onChange.bind(this);
    this.onConvert = this.onConvert.bind(this);
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
    var zencoder = require('zencoder')
    var client = new zencoder('7c22d96003d38db4878c4470e6f91cbd')

    let thisHandle = this;

    client.Job.create({
      input: `http://127.0.0.1:5000/videos/${this.state.videoFileName}`, 
      outputs: [
        {
          format: thisHandle.state.convertTo,
          url: `s3://zen-tests/awesome-movie.${thisHandle.state.convertTo}`
        }
      ]
    }, function(err, data) {
      if (err) { console.log(err); return; }

      thisHandle.poll(data)
    })
  }

  poll(data) {
    let Zencoder = require('zencoder')
    let client = new Zencoder('7c22d96003d38db4878c4470e6f91cbd')

    console.log(data)

    let thisHandle = this

    setTimeout(function(){
      client.Job.progress(data.id, function(err, res) {
        if (err) { console.log("OH NO! There was an error"); return err; }
        if (res.state === 'waiting') {
          console.log("Waiting")
          thisHandle.poll(data)
        } else if (res.state === 'processing') {
          var progress = Math.round(res.progress * 100) / 100;
          console.log(`Progress: ${progress}`)
          thisHandle.poll(data)
        } else if (res.state === 'finished') {
          console.log('Job finished!')
          fileDownload(data.url, `${new Date()}.${thisHandle.state.convertTo}`)
        }
      }, 5000)
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