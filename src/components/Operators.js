import React from 'react';
import  PropType from 'prop-types';
// Components
import Key from './Key';

const Operators = ({ handleOperatorPress, handleClearPress}) => (
  // Component to hold the aritmatic operator keys
  <div className="Calc-operators">
    <Key 
      value="Clear"
      handleClick={handleClearPress}
    >
      <i className="fas fa-backspace"></i>
    </Key>
    <Key 
      value="/"
      handleClick={handleOperatorPress}
    >
      &#247;
    </Key>
    <Key 
      value="*"
      handleClick={handleOperatorPress}
    >
      &#215;
    </Key>
    <Key 
      value="-"
      handleClick={handleOperatorPress}
    >
      -
    </Key>
    <Key 
      value="+"
      handleClick={handleOperatorPress}
    >
      +
    </Key>
    
  </div>
)
Operators.propTypes = {
  handleOperatorPress: PropType.func.isRequired,
  handleClearPress: PropType.func.isRequired
}

export default Operators