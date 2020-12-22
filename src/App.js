/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
//Components
import Display from './components/Display';
import Keypad from './components/Keypad';
import Operators from './components/Operators';
// CSS
import './App.css'
// Utils
import { infixToPostFix, evalPostFix } from './utils/evaluate'

const App = () => {
  const [result, setResult] = useState('')
  const [expression, setExpression] = useState({
    expression: [],
    newOperand: true
  })
  
  useEffect(() => {
    // Evaluate the expression whenver the expression string changes
    const postFix = infixToPostFix(expression.expression)
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
  }, [expression])

  const handleOperandPress = (char) => {
    // Set Operand to display. This includes all numbers and decimal
    const validChar = () => {
      if (expression.expression.length > 0) {
        const currentOperand = expression.expression[expression.expression.length - 1]
        switch (char) {
          case '.':
            return currentOperand.indexOf(char) === -1
          case '0':
            return !(currentOperand.indexOf(char) === 0 && currentOperand.length === 1)
          default:
            return true
        }
      }
      return true
    }
    
    if (validChar()) {
      if (expression.newOperand) {
        setExpression(expression => (
          {
            ...expression,
            expression: [...expression.expression, char === '.' ? '0.' : char ],
            newOperand: false
          }
        ))     
      } else {
        setExpression(expression => {
          const updatedExpression = [...expression.expression]
          updatedExpression[updatedExpression.length - 1] = updatedExpression[updatedExpression.length - 1] + char
          return (
          {
            ...expression,
            expression: [...updatedExpression]
          }
        )})
      }      
    }
  }

  const handleOperatorPress = (char) => {
    // Change operator if no operand has been added
    if (expression.newOperand) {
      const tmpExpression = [...expression.expression]
      tmpExpression[tmpExpression.length - 1] = char
      setExpression(expression => ({...expression, expression: tmpExpression}))
    } else {
      // Move current display to result.operand
      setExpression(expression => (
        {
          ...expression, 
          expression: [...expression.expression, char],
          newOperand: true
        }
      ))
    }
  }
    
  const handleEqualPress = () => {
    if (result) {
      setExpression(expression => ({...expression, expression: [result]}))
      setResult('')
    }
  }

  const handleClearPress = () => {
    setExpression(expression => {
      const strExpression = expression.expression.join(' ')
      return (
        {
          ...expression,
          expression: strExpression.trim().slice(0, -1).split(' ')
        }
      )
    })
  }

  return (
    <div className="Calc-app">
      <Display result={result} expression={expression.expression.join(' ')} />
      <div className="Calc-keys">
        <Keypad handleOperandPress={handleOperandPress} handleEqualPress={handleEqualPress} />
        <Operators handleOperatorPress={handleOperatorPress} handleClearPress={handleClearPress} />
      </div>
    </div>
  )
}
export default App;