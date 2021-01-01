/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CalculatorWrapper = ({ children }) => (
  <div className="Calc-app">
    { children }
  </div>
)
CalculatorWrapper.propTypes = {
  children: PropTypes.node
}
export default CalculatorWrapper;