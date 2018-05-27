import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import InlineMessage from './InlineMessage'
import Button from './Button'
import '../styles/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      url: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault();

    const isValid = this.validate(this.state.url)
        
    if (isValid) {
      this.props.onSubmit(this.state.url)
      this.setState({ url: '' })
    }
  }

  onChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    })
  }

  validate(url) {
    const errors = {}

    if (url.trim() === '') 
      errors.url = 'Youtube link can\'t be empty'

    this.setState({ 
      errors 
    })
        
    return Object.keys(errors).length === 0
  }

  render() {
    const { errors } = this.state

    return (
      <div>
        <form className="searchBarForm" onSubmit={this.onSubmit}>
          <input className='input' type='text' name='url' value={this.state.url} onChange={this.onChange} placeholder="Paste youtube link here..."/>
          <Button name='Find' />
        </form>

        {!!errors.url && 
          <InlineMessage text={errors.url}
                         className={"error"} /> 
        }
      </div>
    )
  }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SearchBar