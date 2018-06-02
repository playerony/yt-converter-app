import React, { Component } from 'react'
import CaptureVideoFrame from '../utils/CaptureVideoFrame'
import fileDownload from 'react-file-download'
import GIFEncoder from 'gifencoder'
import { Player, 
         ControlBar, 
         PlaybackRateMenuButton, 
         VolumeMenuButton,
         BigPlayButton,
         LoadingSpinner,
         ForwardControl
} from 'video-react'
import Button from '../components/Button'
import fs from 'fs'
import VideoScreenshotCanvas from '../components/VideoScreenshotCanvas'
import SelectVideoForm from '../components/SelectVideoForm'
import '../../node_modules/video-react/dist/video-react.css'
import '../styles/VideoEditorPage.css'

class GifGeneratorPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      frame: null,
      video: null,
    }

    this.onClick = this.onClick.bind(this)
    this.onInputFileChange = this.onInputFileChange.bind(this)
    this.onVideoSelect = this.onVideoSelect.bind(this)

    // this.gif = new GIF({
    //   workers: 4,
    //   width: 600,
    //   height: 337
    // });

    // this.gif.on('finished', function(blob) {
    //   window.open(URL.createObjectURL(blob));
    // });
  }

  onVideoSelect(selectedFile) {
    this.setState({
      video: require('../other/videos/' + selectedFile.name)
    })
  }

  onClick() {
    let frame = CaptureVideoFrame(this.refs.player.video.video)

    // this.canvas = document.getElementById('canvas')
    // this.canvas.width = 500
    // this.canvas.height = 300

    // this.ctx = this.canvas.getContext('2d')

    // this.ctxImage = new Image()
    // this.ctxImage.src = frame.dataUri

    // this.ctxImage.onload = () => {
    //   this.ctx.drawImage(this.ctxImage, 0, 0, this.canvas.width, this.canvas.height)
    // }

    // var gif = new GIF({
    //   workers: 2,
    //   quality: 10
    // });
    
    // gif.addFrame(this.canvas, {copy: true});

    // gif.on('finished', function(blob) {
    //   console.log(`BLOB: ${blob}`)

    //   window.open(URL.createObjectURL(blob));
    // });

    // console.log(gif)
    
    // console.log(gif.render())

    var encoder = new GIFEncoder(320, 240)
    console.log(encoder)

    encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

    encoder.start();
    encoder.setRepeat(0);   
    encoder.setDelay(500);  
    encoder.setQuality(10); 

    this.canvas = document.getElementById('canvas')
    this.canvas.width = 320
    this.canvas.height = 240

    var ctx = this.canvas.getContext('2d');

    // blue rectangle frame
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 320, 240);
    encoder.addFrame(ctx);

    // image frame
    var img = new Image(); 
    img.src = frame.dataUri;
    ctx.drawImage(img, 0, 0, 320, 240);
    encoder.addFrame(ctx);

    console.log(encoder)

    encoder.finish()
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
              </main>

              <Button onClick={this.onClick} name="Start" />
            </div>

            <canvas id='canvas'/>
          </div>
        }
      </div>
    )
  }
}
export default GifGeneratorPage