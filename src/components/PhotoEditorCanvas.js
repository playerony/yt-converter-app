import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import '../styles/MemeGeneratorCanvas.css'

class PhotoEditorCanvas extends Component {
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
    this.ctxImage.src = this.props.image
        
    this.updateFilterEffects()
    this.redrawCanvas()
  }

  componentDidUpdate(){
    this.ctxImage.src = this.props.image

    this.redrawCanvas()
  }

  updateFilterEffects() {
    let filterString = ''

    if(this.props.options.blur.isActive === true)
      filterString += ` blur(${this.props.options.blur.length}px) `

    if(this.props.options.brightness.isActive === true)
      filterString += ` brightness(${this.props.options.brightness.percentage}) `

    if(this.props.options.contrast.isActive === true)
      filterString += ` contrast(${this.props.options.contrast.percentage}) `

    if(this.props.options.grayscale.isActive === true)
      filterString += ` grayscale(${this.props.options.grayscale.percentage}) `

    if(this.props.options.invert.isActive === true)
      filterString += ` invert(${this.props.options.invert.percentage}) `

    if(this.props.options.saturate.isActive === true)
      filterString += ` saturate(${this.props.options.saturate.percentage}) `

    if(this.props.options.sepia.isActive === true)
      filterString += ` sepia(${this.props.options.sepia.percentage}) `

    if(this.props.options.effects === 0)
      filterString = 'none'

    this.ctx.filter = filterString
  }
    
  redrawCanvas(){
    this.updateFilterEffects()
    this.ctx.drawImage(this.ctxImage, 0, 0, this.canvas.width, this.canvas.height)
  }

  render() {
    return (
      <canvas id='canvas'/>
    )
  }
}

PhotoEditorCanvas.propTypes = {
  image: PropTypes.string.isRequired
}

export default PhotoEditorCanvas