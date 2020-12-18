import React from 'react';
// import PropType from 'prop-types'
// Componenets
const toggleHistory = (e) => {
  const elem = e.target
  
  elem.style.transition = "height 2s ease-out";
  elem.style.height = "400px";
}
const History = () => (
  <div className="Calc-history">
    <button
      onClick={(e)=>toggleHistory(e)}>
      <i className="fas fa-chevron-down" /> History
    </button>
  </div>
  
)

export default History