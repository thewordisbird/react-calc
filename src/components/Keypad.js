import React from 'react';
import PropType from 'prop-types';
// Components
import Key from './Key'

// Question: Why is handleKeypadPress converted to an object?
const Keypad = (handleKeypadPress) => (
  <div className="Calc-keypad">
  {"7894561230.".split('').map( (val, idx) => (
    <Key 
      key={idx}
      value={val} 
      width={(val === '0') ? 'double' : ''}
      handleClick={handleKeypadPress.handleKeypadPress}
    >
      {val}
    </Key>
  ))}
  </div>
)
Keypad.propTypes = {
  handleKeypadPress: PropType.func.isRequired
}

export default Keypad;
