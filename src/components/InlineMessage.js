import React, { Component } from 'react' 
import { PropTypes } from 'prop-types'
import '../styles/InlineMessage.css'

class InlineMessage extends Component { 
  render() {
    const { className, message } = this.props

    return (
      <div className={`alert ${className}`}> 
        <strong>{className.toUpperCase()}!</strong> {message}
      </div>
    )
  }
}

InlineMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default InlineMessage