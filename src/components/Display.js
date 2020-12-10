import React from 'react'
import PropType from 'prop-types';

const Display = ({ output }) => (
  <div className="Calc-display">
    {output}
  </div>
)
Display.propTypes = {
  output: PropType.string.isRequired
}

export default Display;