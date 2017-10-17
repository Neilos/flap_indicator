import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale'

const AMBER = '#FF9932'
const BLACK = '#333333'
const WHITE = "#FFFFFF"
const CYAN = '#59DFFD'
const GREEN = '#18F360'

const ARROW_LENGTH = 10
const ARROW_OFFSET = 8
const ARROW_HEIGHT = 5
const OFFSET = 4

const frameNumbers = [1, 2, 3, 4]
const pointerLengths = [ARROW_LENGTH, 20, 30, 40]
const rotations = [0, -5, -20, -34]

const pointerLengthScale = scaleLinear()
  .domain(frameNumbers)
  .range(pointerLengths)

const rotationScale = scaleLinear()
  .domain(frameNumbers)
  .range(rotations)

class SlatIndicator extends Component {
  render() {
    const {
      frame,
      targetFrame,
      offset,
    } = this.props

    const circleMarkers = frameNumbers.map((frameNumber, index) => {
      if (!index) { return null }
      const pointerLength = pointerLengths[index]
      const rotation = rotations[index]
      return (
        <g transform={`rotate(${rotation}) translate(${-pointerLength}, 0)`}
          key={index}>
          <circle
            fill={WHITE}
            stroke={WHITE}
            cx="0"
            cy="0"
            r="1"
          />
        </g>
      )
    })

    const targetPointerLength = pointerLengthScale(targetFrame)
    const targetRotation = rotationScale(targetFrame)
    const currentPointerLength = pointerLengthScale(frame)
    const currentRotation = rotationScale(frame)

    return (
      <g className="SlatIndicator">
        <polygon
          fill="#CCCCCC"
          stroke="#CCCCCC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points={`
            -${offset + ARROW_LENGTH - ARROW_OFFSET},${-ARROW_HEIGHT}
            0,${-ARROW_HEIGHT}
            0,0
            -${offset},0
          `}
        />

        <g transform={`translate(${-offset}, 0)`}>

          {circleMarkers}

          <g transform={
            `rotate(${targetRotation}) translate(${-targetPointerLength}, 0)`
            }>
            <polygon
              fill="none"
              stroke={CYAN}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              points={`
                0,0
                ${ARROW_OFFSET},${-ARROW_HEIGHT}
                ${ARROW_LENGTH},0
              `}
            />
          </g>

          <g transform={`rotate(${currentRotation})`}>
            <line
              x1="0"
              y1="0"
              x2={-currentPointerLength}
              y2="0"
              stroke={GREEN} />

            <g transform={`translate(${-currentPointerLength}, 0)`}>
              <polygon
                fill="#333"
                stroke={GREEN}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                points={`
                  0,0
                  ${ARROW_OFFSET},${-ARROW_HEIGHT}
                  ${ARROW_LENGTH},0
                `}
              />
            </g>
          </g>
        </g>
      </g>
    )
  }
}

export default SlatIndicator;
