/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
//Components
import Display from './components/Display';
import Keypad from './components/Keypad';
import Operators from './components/Operators';
// CSS
import './App.css'
// utils
import { infixToPostFix, evalPostFix } from './utils/evaluate'

const App = () => {
  const [result, setResult] = useState('')
  const [expression, setExpression] = useState('')
  const [input, setInput] = useState({
    value: '0',
    newInput: true
  })

  useEffect(() => {
    // Evaluate the expression whenver the expression string changes
    const postFix = infixToPostFix(expression)
    const evalResult = evalPostFix(postFix)
    
    setResult(result => {      
      if  (!isNaN(evalResult)) {
        return evalResult.toString()
      } else {
        return result
      }
    })    
  }, [expression])

  useEffect(() => {
    // Add event handler to allow for keyboard interaction with app
    const handleUserKeyPress = (e) => {
      if ("0123456789.".indexOf(e.key) > -1) {
        handleOperandPress(e.key)      
      } else if ("+-/*".indexOf(e.key) > -1) {
        handleOperatorPress(e.key)
      } else if (e.key === 'Enter') {
        handleEqualPress('=')
      } else if (e.key === 'Backspace') {
        handleClearPress()
      }
    }

    window.addEventListener('keydown', handleUserKeyPress)
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [input, expression])

  const handleOperandPress = (char) => {
    // Set Operand to display. This includes all numbers and decimal
    const validChar = () => {
      switch (char) {
        case '.':
          return (input.value.indexOf(char) === -1)
        case '0':
          return !(input.value.indexOf(char) === 0 && input.length === 1)
        default:
          return true
      }
    }
    
    if (validChar()) {
      if (input.newInput) {
        setInput(input => (
          {
            value: (char === '.' ? '0.' : char),
            newInput: false
          }
        ))
        setExpression(expression => expression + (char === '.' ? '0.' : char))      
      } else {
        setInput(input => (
          {
            ...input,
            value: input + char
          }
        ))
        setExpression(expression => expression + char)
      }      
    }
  }

  const handleOperatorPress = (char) => {
    // Change operator if no operand has been added
    if (input.newInput) {
      setExpression(expression => expression.slice(0, -2) + char + ' ')
    } else {
      // Move current display to result.operand
    setExpression(expression => {
      if (expression.length === 0) {
        return input.value + ' ' + char
      } else {
        return expression + ' ' + char + ' '
      }
    })
    setInput(input => ({...input, newInput: true }))
  }
    }
    

  const handleEqualPress = () => {
    if (result) {
      setExpression(result)
      setResult('')
    }
  }

  const handleClearPress = () => {
    setExpression(expression => expression.trim().slice(0, -1) + ' ')
  }

  return (
    <div className="Calc-app">
      <Display result={result} expression={expression} />
      <div className="Calc-keys">
        <Keypad handleOperandPress={handleOperandPress} handleEqualPress={handleEqualPress} />
        <Operators handleOperatorPress={handleOperatorPress} handleClearPress={handleClearPress} />
      </div>
    </div>
  )
}
export default App;