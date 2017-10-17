import React from 'react'
import PropTypes from 'prop-types'

const NumberPropertyAdjuster = ({
    property,
    value,
    min,
    max,
    onChange,
    step
  }) =>
  <div className="NumberPropertyAdjuster">
    <label htmlFor={property}>{property}</label>
    <input type="number"
      id={property}
      max={max}
      min={min}
      name={property}
      value={value}
      onChange={onChange}
      step={step || 1}
    />
  </div>

NumberPropertyAdjuster.propTypes = {
  property: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NumberPropertyAdjuster
