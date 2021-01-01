import React from 'react';
import PropType from 'prop-types';

const Key = ({ children, value, onClick }) => (
  // Component to display a calculator key with props to handle display
  // and onClick functinality
  <button 
    className="Calc-key"
    id={`key-${value}`}
    onClick={onClick}
  >
    {children}
  </button>
)
Key.propTypes = {
  children: PropType.oneOfType([
    PropType.string,
    PropType.object
  ]).isRequired,  
  value: PropType.string.isRequired,
  onClick: PropType.func.isRequired
}

export default Key;