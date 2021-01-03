/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
// Components
import CalculatorWrapper from './components/CalculatorWrapper';
import Display from './components/Display';
import CalcKeys from './components/CalcKeys';
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
  
  /**
   * START - Dynamic display font sizing
   * */
  const displayEl = document.querySelector(".Calc-expression")
  const spanEl = document.getElementById("expression")

  const resizer = (el) => {
    const curFontSize = parseFloat(window.getComputedStyle(el, null).getPropertyValue("font-size"))
    const newFontSize = .90 * curFontSize
    el.style.fontSize = `${newFontSize}px`
  }
  
  const resetter = (el) => {
    el.style.removeProperty('font-size')
  }

  useEffect(() => {
    // Effect to decrease the font size of the expression to keep it from
    // overflowing the display container
    if (displayEl && spanEl.offsetWidth > .90 * displayEl.offsetWidth) {
      resizer(spanEl)      
    }
  }, [expression])

  useEffect(() => {
    // Effect to reset the fontsize to the original size
    if (spanEl && expression.length <=1) {
      resetter(spanEl)
    }
  }, [expression])
  /**
   * END - Dynamic display font sizing
   * */
  
  return (
    <CalculatorWrapper >
      <Display result={result} expression={expression}/>
      <CalcKeys >
        <Keypad handleClick={onKeyPress}/>
        <Operators handleClick={onKeyPress}/>
      </CalcKeys>
    </CalculatorWrapper>
  )
}
export default App;