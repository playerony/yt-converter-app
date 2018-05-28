import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import '../styles/PhotoEditorEffect.css'

class PhotoEditorEffect extends Component {
  render() {
    const { onCheckboxChange, onRangeChange, effectName, min, max, step, value } = this.props

    return (
      <div className='effectComponent'>
        <input type='checkbox' className='checkbox' onChange={onCheckboxChange} />
        <h1>{effectName}</h1>
        <input type='range' className='slider' name='points' min={min} max={max} step={step} defaultValue={value} onChange={this.props.onRangeChange} />
      </div>
    )
  }
}

PhotoEditorEffect.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  onRangeChange: PropTypes.func.isRequired,
  effectName: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

export default PhotoEditorEffect