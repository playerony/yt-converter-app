import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class VideoScreenshotCanvas extends Component {
  constructor(props){
    super(props)

    this.ctxImage = new Image()
    this.update = this.update.bind(this)

    this.update()
  }

  componentDidMount(){
    this.canvas = document.getElementById('canvas')
    this.canvas.width = 500
    this.canvas.height = 300
    this.ctx = this.canvas.getContext('2d')

    this.update()
  }

  componentDidUpdate(){
    this.update()
  }

  update() {
    if(this.props.frame !== null) {
      this.ctxImage.src = this.props.frame.dataUri
      this.redrawCanvas()
    }
  }
    
  redrawCanvas(){
    this.ctxImage.onload = () => {
      this.ctx.drawImage(this.ctxImage, 0, 0, this.canvas.width, this.canvas.height)
    }
  }

  render() {
    return (
      <canvas id='canvas'/>
    )
  }
}

VideoScreenshotCanvas.propTypes = {
  frame: PropTypes.object.isRequired
}

export default VideoScreenshotCanvas