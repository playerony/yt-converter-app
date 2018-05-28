import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import '../styles/Image.css'

class Image extends Component {
  render() {
    const { value, onClick, source } = this.props

    return (
      <img className="thumbnails" 
           alt={`picture${this.props.value}`}
           onClick={this.props.onClick} 
           value={this.props.value} 
           src={this.props.source} />
    )
  }
}

Image.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired
}

export default Image