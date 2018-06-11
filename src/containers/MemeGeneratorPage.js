import React, { Component } from 'react'
import fileDownload from 'react-file-download'
import Image from '../components/Image'
import MemeGeneratorCanvas from '../components/MemeGeneratorCanvas'
import Button from '../components/Button'
import InlineMessage from '../components/InlineMessage'
import images from '../utils/ImageLoader'
import '../styles/MemeGeneratorPage.css'
import '../styles/Button.css'

class MemeGeneratorPage extends Component {
  constructor() {
    super()

    this.state = {
      indexOfImage : 0,
      topText: '',
      bottomText: ''
    }

    this.handleBottomInputChange = this.handleBottomInputChange.bind(this)
    this.handleTopInputChange = this.handleTopInputChange.bind(this)
  }

  handleImageClick(index){
    this.setState({
      indexOfImage: index
    })
  }

  handleTopInputChange(event){
    this.setState({
      topText: event.target.value
    })
  }

  handleBottomInputChange(event){
    this.setState({
      bottomText: event.target.value
    })  
  }

  resetInput(input){
    if(input === 'bottom'){
      this.setState({
        bottomText : ''
      })
    }
    else if(input === 'top'){
      this.setState({
        topText : ''
      })
    }
  }

  handleSaveButtonClick(){
    let canvas = document.getElementById('canvas')
    canvas.toBlob(function(blob) {
      fileDownload(blob, `${new Date()}.png`)
    })
  }

  renderMessage() {
    return <InlineMessage message="There are no memes to edit"
                          className="error" />
  }

  render() {
    return (
      <main className="container">
        {images.length > 0 ?
          <div>
            <div>
              {images.map((e, index) => {
                return <Image onClick={() => this.handleImageClick(index)} 
                              value={index} 
                              source={images[index]} 
                              key={index} />
              })}
            </div>
            <div>
              <MemeGeneratorCanvas image={images[this.state.indexOfImage]} 
                                   topText={this.state.topText.toUpperCase()} 
                                   bottomText={this.state.bottomText.toUpperCase()}/>
            </div>
            <div>
              <input className="input" maxLength="60" value={this.state.topText} onChange={this.handleTopInputChange} placeholder='top text' type='text'/>
              <Button onClick={() => this.resetInput("top")} name="clear"/>
              <input className="input" maxLength="60" value={this.state.bottomText} onChange={this.handleBottomInputChange} placeholder='bottom text'  type='text'/>
              <Button onClick={() => this.resetInput("bottom")} name="clear"/><br/>
              <Button onClick={() => this.handleSaveButtonClick()} name="generate"/>
            </div>
          </div>
        :
          this.renderMessage()
        }
      </main>
    )
  }
}
export default MemeGeneratorPage