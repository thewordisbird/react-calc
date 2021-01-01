import React from 'react';
import PropType from 'prop-types';
// Components
import Key from './Key'

const Keypad = ({ handleClick }) => (
  // Component to house the numeric keys. In this case it includes the decimal key
  <div className="Calc-keypad">
    {"7894561230.=".split('').map( (val, idx) => (
        <Key 
          key={idx}
          value={val} 
          onClick={() => handleClick(
            val === '=' 
              ? {type: 'equal', key: val}
              : {type: 'operand', key: val}
            )}
        >
          {val}
        </Key>
    ))}
  </div>
)
Keypad.propTypes = {
  handleClick: PropType.func.isRequired,
}

export default Keypad;
