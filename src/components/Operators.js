import React from 'react';
import  PropType from 'prop-types';
// Components
import Key from './Key';

const Operators = ({ handleOperator}) => (
  // Component to hold the aritmatic operator keys
  <div className="Calc-operators">
    <Key 
      value="/"
      handleClick={handleOperator}
    >
      &#247;
    </Key>
    <Key 
      value="*"
      handleClick={handleOperator}
    >
      &#215;
    </Key>
    <Key 
      value="-"
      handleClick={handleOperator}
    >
      -
    </Key>
    <Key 
      value="+"
      handleClick={handleOperator}
    >
      +
    </Key>
    <Key 
      value="="
      handleClick={handleOperator}
    >
      =
    </Key>
  </div>
)
Operators.propTypes = {
  handleOperator: PropType.func.isRequired
}

export default Operators