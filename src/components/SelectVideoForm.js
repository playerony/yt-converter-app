import React, { Component } from 'react'
import '../styles/SelectVideoForm.css'

class SelectVideoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitDisabled: true,
      selectedVideo: '',
    }
  }

  onChange = e => {
    this.setState({
      selectedVideo: e.target.files[0],
      submitDisabled: false
    })
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.onVideoSelect(this.state.selectedVideo);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Submit your video</h1>
        <div>
          <label htmlFor="file" className="fileContainer">
            Choose a file
            <input type="file"
                   name="selectedFile"
                   className="button"
                   onChange={this.onChange}
                   accept=".ogg,.ogv"
            />
          </label>
        </div>
        <div>
          <button disabled={this.state.submitDisabled}>Submit Video</button>
        </div>
      </form>
    )
  }
}
export default SelectVideoForm