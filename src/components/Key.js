import React from 'react';
import PropType from 'prop-types';

const Key = ({ children, value, width, handleClick }) => (
  // Component to display a calculator key with props to handle display
  // and onClick functinality
  <button 
    className={`Calc-${width ? width+'-' : ''}key`}
    value={value}
    onClick={() => handleClick(value)}
  >
    {children}
  </button>
)
Key.propTypes = {
  children: PropType.string.isRequired,
  value: PropType.string.isRequired,
  width: PropType.string,
  handleClick: PropType.func.isRequired
}

export default Key;