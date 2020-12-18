import React from 'react';
import PropType from 'prop-types';
// Components
import Key from './Key'


const Keypad = ({ handleOperandPress, handleEqualPress }) => (
  // Component to house the numeric keys. In this case it includes the decimal key
  <div className="Calc-keypad">
  {"7894561230.".split('').map( (val, idx) => (
    <Key 
      key={idx}
      value={val} 
      handleClick={handleOperandPress}
    >
      {val}
    </Key>
  ))}
  <Key
    value='='
    handleClick={handleEqualPress}
  >
    =
  </Key>
  </div>
)
Keypad.propTypes = {
  handleOperandPress: PropType.func.isRequired,
  handleEqualPress: PropType.func.isRequired
}

export default Keypad;
