import React from 'react'
import PropType from 'prop-types';

const Display = ({ output }) => (
  // Component to display the entry value or result after an operation
  <div className="Calc-display">
    {output}
  </div>
)
Display.propTypes = {
  output: PropType.string.isRequired
}

export default Display;