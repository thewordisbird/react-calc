import React from 'react';
import PropType from 'prop-types';

// Components
import Key from './Key';

const Controls = ({ reset, handleReset, handleSignChange, handlePercent  }) => (
  <div className="Calc-controls">
    <Key 
      value={reset ? 'AC' : 'C'} 
      handleClick={handleReset}
    >
      {reset ? 'AC' : 'C'}
    </Key>
    <Key 
      value="+/-" 
      handleClick={handleSignChange}
    >
      +/-
    </Key>
    <Key 
      value="%"
      handleClick={handlePercent}
    >
      %
    </Key>
</div>
)
Controls.propTypes = {
  reset: PropType.bool.isRequired,
  handleReset: PropType.func.isRequired,
  handleSignChange: PropType.func.isRequired,
  handlePercent: PropType.func.isRequired
}
export default Controls;