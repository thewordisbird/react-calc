/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
// Components
import CalculatorWrapper from './components/CalculatorWrapper';
import Display from './components/Display';
import Keypad from './components/Keypad';
import Operators from './components/Operators';
// Hooks
import useCalcState from './hooks/useCalcState'
import useKeyboard from './hooks/useKeyboard'
// CSS
import './App.css'

const App = () => {
  const { 
    calcState, 
    onKeyPress
  } = useCalcState()
  const { result, expression } = calcState

  // Add keyboard functionality.
  const handleKeyboardInput = useCallback((e) => {
    // Callback to pass to useKeyboard hook to handle key input
    if ("0123456789.".indexOf(e.key) > -1) {
      onKeyPress({type: 'operand', key: e.key})      
    } else if ("+-/*".indexOf(e.key) > -1) {
      onKeyPress({type: 'operator', key: e.key})
    } else if (e.key === 'Enter') {
      onKeyPress({type: 'equal', key: e.key})
    } else if (e.key === 'Backspace') {
      onKeyPress({type: 'clear', key: e.key})
    }
  }, [onKeyPress])

  useKeyboard(handleKeyboardInput, [result, expression])

  return (
    <CalculatorWrapper >
      <Display result={result} expression={expression.join(' ')}/>
      <Keypad handleClick={onKeyPress}/>
      <Operators handleClick={onKeyPress}/>
    </CalculatorWrapper>
  )
}
export default App;