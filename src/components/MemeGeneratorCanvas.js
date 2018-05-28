import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import getLinesOfText from '../utils/CanvasUtils'
import '../styles/MemeGeneratorCanvas.css'

class MemeGeneratorCanvas extends Component {
  constructor(props){
    super(props)
      
    this.ctxImage = new Image()
    this.ctxImage.src = this.props.image
  }

  componentDidMount(){
    this.canvas = document.getElementById("canvas")
    this.canvas.width = 500
    this.canvas.height = 500

    this.ctx = this.canvas.getContext("2d")
    this.ctx.font = "45px Impact"
    this.ctx.fillStyle = "white"

    this.ctxImage.src = this.props.image        
    this.redrawCanvas()
  }

  componentDidUpdate(){
    this.ctxImage.src = this.props.image
    this.redrawCanvas()
  }
    
  redrawCanvas(){
    this.ctx.drawImage(this.ctxImage, 0, 0, this.canvas.width, this.canvas.height)
    this.drawText(true, this.props.topText, this.canvas.width / 2, 50)
    this.drawText(false, this.props.bottomText, this.canvas.width / 2, this.canvas.height - 20)
  }

  drawText(isTop, text, x, y){
    this.ctx.textAlign = "center"

    let lines = getLinesOfText(text)
    let numberOfLines = lines.length

    for(let i=0 ; i<lines.length ; i++) {
      let newY = y + i * 50
      if(isTop === false) 
        newY -= (numberOfLines - 1) * 50

      this.ctx.fillText(lines[i], x, newY)
      this.ctx.strokeText(lines[i], x, newY)
    }
  }

  render() {
    return (
      <canvas id='canvas'/>
    )
  }
}

MemeGeneratorCanvas.propTypes = {
  image: PropTypes.string.isRequired,
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired
}

export default MemeGeneratorCanvas