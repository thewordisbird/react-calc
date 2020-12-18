import React from 'react'
import PropType from 'prop-types';

const Display = ({ result, expression }) => (
  // Component to display the entry value or result after an operation
  <div className="Calc-display">
    <div className="Calc-expression">
      {expression}
    </div>      
    <div className="Calc-result">
      {result}
    </div>
    
  </div>
  
)
Display.propTypes = {
  result: PropType.string.isRequired,
  expression: PropType.string.isRequired
}

export default Display;