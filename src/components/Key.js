import React from 'react';
import PropType from 'prop-types';

const Key = ({ text, value, type, width, handleClick }) => (
  <button 
    className={`Calc-${width ? width+'-' : ''}key ${type}-key`}
    value={value}
    onClick={() => handleClick(value)}
  >
    {text}
  </button>
)
Key.propTypes = {
  text: PropType.string.isRequired,
  value: PropType.string.isRequired,
  type: PropType.string.isRequired,
  width: PropType.string,
  handleClick: PropType.func.isRequired
}

export default Key;