import React, { Component } from 'react';
import NumberPropertyAdjuster from './NumberPropertyAdjuster'
import SlatIndicator from './SlatIndicator'
import FlapIndicator from './FlapIndicator'

const ARROW_LENGTH = 10
const ARROW_OFFSET = 8
const ARROW_HEIGHT = 5

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      slat: {
        frame: 1,
        targetFrame: 1,
      },
      flap: {
        frame: 1,
        targetFrame: 1,
      },
    }
  }

  onChange (evt) {
    const target = evt.target
    const propertyName = target.name
    const value = target.value
    const propertyValue = isNaN(value) ? value : parseFloat(value, 0)

    const targetFrame = this.state[propertyName].frame > propertyValue ?
      Math.floor(propertyValue) :
      Math.ceil(propertyValue)

    this.setState({[propertyName]: {
      frame: parseFloat(value, 0),
      targetFrame: parseInt(targetFrame, 0),
    }})
  }

  render() {
    return (
      <div className="App">
        <NumberPropertyAdjuster
          property="slat"
          value={this.state.slat.frame}
          min={1}
          max={4}
          onChange={this.onChange.bind(this)}
          step={0.05}
        />

        <NumberPropertyAdjuster
          property="flap"
          value={this.state.flap.frame}
          min={1}
          max={5}
          onChange={this.onChange.bind(this)}
          step={0.05}
        />

        <svg width ="400" height="500" fill="#333">
          <rect width="400" height="500" fill="#333"/>
          <g transform="translate(200, 100)">
            <SlatIndicator
              frame={this.state.slat.frame}
              offset={4}
              targetFrame={this.state.slat.targetFrame}
            />
            <FlapIndicator
              frame={this.state.flap.frame}
              offset={4}
              targetFrame={this.state.flap.targetFrame}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default App;
