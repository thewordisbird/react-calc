import React from 'react';
import  PropType from 'prop-types';
// Components
import Key from './Key';

const Operators = ({ handleClick }) => (
  // Component to hold the aritmatic operator keys
  <div className="Calc-operators">
    <Key 
      value="Clear"
      onClick={() => handleClick({type: 'clear', key: 'clear'})}
    >
      <i className="fas fa-backspace" />
    </Key>
    <Key 
      value="/"
      onClick={() => handleClick({type: 'operator', key: '/'})}
    >
      &#247;
    </Key>
    <Key 
      value="*"
      onClick={() => handleClick({type: 'operator', key: '*'})}
    >
      &#215;
    </Key>
    <Key 
      value="-"
      onClick={() => handleClick({type: 'operator', key: '-'})}
    >
      -
    </Key>
    <Key 
      value="+"
      onClick={() => handleClick({type: 'operator', key: '+'})}
    >
      +
    </Key>
  </div>
)
Operators.propTypes = {
  handleClick: PropType.func.isRequired,
}

export default Operators