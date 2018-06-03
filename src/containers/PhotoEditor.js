import React, { Component } from 'react'
import fileDownload from 'react-file-download'
import Image from '../components/Image'
import Button from '../components/Button'
import InlineMessage from '../components/InlineMessage'
import PhotoEditorCanvas from '../components/PhotoEditorCanvas'
import PhotoEditorEffect from '../components/PhotoEditorEffect'
import images from '../utils/ImageLoader'
import '../styles/Selector.css'
import '../styles/PhotoEditor.css'

class PhotoEditor extends Component {
  constructor() {
    super()

    this.state = {
      blur: {
        isActive: false,
        length: 50
      },
      brightness: {
        isActive: false,
        percentage: 50
      },
      contrast: {
        isActive: false,
        percentage: 50
      },
      grayscale: {
        isActive: false,
        percentage: 50
      },
      invert: {
        isActive: false,
        percentage: 50
      },
      saturate: {
        isActive: false,
        percentage: 50
      },
      sepia: {
        isActive: false,
        percentage: 50
      },
      effects: 0,
      indexOfImage : 0
    }

    this.onBlurCheckboxChange = this.onBlurCheckboxChange.bind(this)
    this.onBlurRangeChange = this.onBlurRangeChange.bind(this)

    this.onBrightnessCheckboxChange = this.onBrightnessCheckboxChange.bind(this)
    this.onBrightnessRangeChange = this.onBrightnessRangeChange.bind(this)

    this.onContrastCheckboxChange = this.onContrastCheckboxChange.bind(this)
    this.onContrastRangeChange = this.onContrastRangeChange.bind(this)

    this.onGrayscaleCheckboxChange = this.onGrayscaleCheckboxChange.bind(this)
    this.onGrayscaleRangeChange = this.onGrayscaleRangeChange.bind(this)

    this.onInvertCheckboxChange = this.onInvertCheckboxChange.bind(this)
    this.onInvertRangeChange = this.onInvertRangeChange.bind(this)

    this.onSaturateCheckboxChange = this.onSaturateCheckboxChange.bind(this)
    this.onSaturateRangeChange = this.onSaturateRangeChange.bind(this)

    this.onSepiaCheckboxChange = this.onSepiaCheckboxChange.bind(this)
    this.onSepiaRangeChange = this.onSepiaRangeChange.bind(this)
  }

  handleImageClick(index){
    this.setState({
      indexOfImage: index
    })
  }

  onBlurCheckboxChange(e) {
    this.setState({ 
      blur: {
        isActive: e.target.checked,
        length: this.state.blur.length
      },
      effects: this.checkCheckbox(this.state.effects, e.target.checked)
    })
  }

  onBlurRangeChange(e) {
    this.setState({ 
      blur: {
        isActive: this.state.blur.isActive,
        length: e.target.value
      }
    })
  }

  onBrightnessCheckboxChange(e) {
    this.setState({ 
      brightness: {
        isActive: e.target.checked,
        percentage: this.state.brightness.percentage
      },
      effects: this.checkCheckbox(this.state.effects, e.target.checked)
    })
  }

  onBrightnessRangeChange(e) {
    this.setState({ 
      brightness: {
        isActive: this.state.brightness.isActive,
        percentage: e.target.value
      }
    })
  }

  onContrastCheckboxChange(e) {
    this.setState({ 
      contrast: {
        isActive: e.target.checked,
        percentage: this.state.contrast.percentage
      },
      effects: this.checkCheckbox(this.state.effects, e.target.checked)
    })
  }

  onContrastRangeChange(e) {
    this.setState({ 
      contrast: {
        isActive: this.state.contrast.isActive,
        percentage: e.target.value
      }
    })
  }

  onGrayscaleCheckboxChange(e) {
    this.setState({ 
      grayscale: {
        isActive: e.target.checked,
        percentage: this.state.grayscale.percentage
      },
      effects: this.checkCheckbox(this.state.effects, e.target.checked)
    })
  }

  onGrayscaleRangeChange(e) {
    this.setState({ 
      grayscale: {
        isActive: this.state.grayscale.isActive,
        percentage: e.target.value
      }
    })
  }

  onInvertCheckboxChange(e) {
    this.setState({ 
      invert: {
        isActive: e.target.checked,
        percentage: this.state.invert.percentage
      },
      effects: this.checkCheckbox(this.state.effects, e.target.checked)
    })
  }

  onInvertRangeChange(e) {
    this.setState({ 
      invert: {
        isActive: this.state.invert.isActive,
        percentage: e.target.value
      }
    })
  }

  onSaturateCheckboxChange(e) {
    this.setState({ 
      saturate: {
        isActive: e.target.checked,
        percentage: this.state.saturate.percentage
      },
      effects: this.checkCheckbox(this.state.effects, e.target.checked)
    })
  }

  onSaturateRangeChange(e) {
    this.setState({ 
      saturate: {
        isActive: this.state.saturate.isActive,
        percentage: e.target.value
      }
    })
  }

  onSepiaCheckboxChange(e) {
    this.setState({ 
      sepia: {
        isActive: e.target.checked,
        percentage: this.state.sepia.percentage
      },
      effects: this.checkCheckbox(this.state.effects, e.target.checked)
    })
  }

  onSepiaRangeChange(e) {
    this.setState({ 
      sepia: {
        isActive: this.state.sepia.isActive,
        percentage: e.target.value
      }
    })
  }

  checkCheckbox(effects, checkboxState) {
    return checkboxState ? (effects + 1) : (effects - 1)
  }

  handleSaveButtonClick(){
    let canvas = document.getElementById("canvas")
    canvas.toBlob(function(blob) {
      fileDownload(blob, `${new Date()}.png`)
    })
  }

  renderMessage() {
    return <InlineMessage text="There are no photos to edit"
                          className="error" />
  }

  render() {
    return (
      <main className='container'>
        {images.length > 0 ?
          <div>
            <div>
              {images.map((e, index) => {
                return <Image onClick={()=> this.handleImageClick(index)} 
                              value={index} 
                              source={images[index]} 
                              key={index} />
              })}
            </div>
            <div>
              <PhotoEditorCanvas image={images[this.state.indexOfImage]} options={this.state} />
            </div>
            <div>
              <div>
                <PhotoEditorEffect effectName="Blur"
                                   min={0}
                                   max={50}
                                   step={0.1}
                                   value={25}
                                   onCheckboxChange={this.onBlurCheckboxChange}
                                   onRangeChange={this.onBlurRangeChange} />

                <PhotoEditorEffect effectName="Brightness"
                                   min={0}
                                   max={25}
                                   step={0.1}
                                   value={12.5}
                                   onCheckboxChange={this.onBrightnessCheckboxChange}
                                   onRangeChange={this.onBrightnessRangeChange} />

                <PhotoEditorEffect effectName="Contrast"
                                   min={0}
                                   max={100}
                                   step={0.2}
                                   value={50}
                                   onCheckboxChange={this.onContrastCheckboxChange}
                                   onRangeChange={this.onContrastRangeChange} />

                <PhotoEditorEffect effectName="Grayscale"
                                   min={0}
                                   max={1}
                                   step={0.01}
                                   value={0.5}
                                   onCheckboxChange={this.onGrayscaleCheckboxChange}
                                   onRangeChange={this.onGrayscaleRangeChange} />

                <PhotoEditorEffect effectName="Invert"
                                   min={0}
                                   max={1}
                                   step={0.01}
                                   value={0.5}
                                   onCheckboxChange={this.onInvertCheckboxChange}
                                   onRangeChange={this.onInvertRangeChange} />

                <PhotoEditorEffect effectName="Saturate"
                                   min={0}
                                   max={100}
                                   step={0.2}
                                   value={50}
                                   onCheckboxChange={this.onSaturateCheckboxChange}
                                   onRangeChange={this.onSaturateRangeChange} />

                <PhotoEditorEffect effectName="Sepia"
                                   min={0}
                                   max={1}
                                   step={0.01}
                                   value={0.5}
                                   onCheckboxChange={this.onSepiaCheckboxChange}
                                   onRangeChange={this.onSepiaRangeChange} />
              </div>
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
export default PhotoEditor