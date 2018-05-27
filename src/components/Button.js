import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class Button extends Component { 
  render() {
    const { onClick, name } = this.props

    return (
      <button className="button" onClick={onClick}>
        {name}
      </button>
    )
  }
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Button