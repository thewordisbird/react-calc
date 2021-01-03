import React from 'react';
import PropTypes from 'prop-types';

const CalcKeys = ({ children }) => (
  <div className="Calc-keys">
    {children}
  </div>
)
CalcKeys.propTypes = {
  children: PropTypes.node.isRequired
}

export default CalcKeys;