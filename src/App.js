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
  const [expression, setExpression] = useState(
    {
    expression: [],
    newExpression: true,
    newOperand: true
    }
  )
  
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
        handleEqualPress()
      } else if (e.key === 'Backspace') {
        handleClearPress()
      }
    }
    window.addEventListener('keydown', handleUserKeyPress)
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [expression, result])

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
            expression: expression.newExpression ? [char === '.' ? '0.' : char] : [...expression.expression, char === '.' ? '0.' : char ],
            newExpression: false,
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
    if (expression.newExpression || !expression.newOperand) {
      setExpression(expression => (
        {
          ...expression, 
          expression: [...expression.expression, char],
          newExpression: false,
          newOperand: true
        }
      ))
    } else if (expression.newOperand && expression.expression.length > 1) {
      const tmpExpression = [...expression.expression]
      tmpExpression[tmpExpression.length - 1] = char
      setExpression(expression => ({...expression, expression: tmpExpression}))
    } else {
      if (char === '-') {
        setExpression(expression => (
          {
            ...expression,
            expression: [char]
          }
        ))
      }
    }
  }
    
  const handleEqualPress = () => {
    setExpression(expression => (
      {
        ...expression, 
        expression: [result],
        newExpression: true,
        newOperand: true
      }
    ))    
  }
1
  const handleClearPress = () => {
    setExpression(expression => {
      const strExpression = expression.expression.join(' ')
      const modifiedExpression = strExpression.slice(0, -1).trim().split(' ')
      return (
        {
          ...expression,
          expression: modifiedExpression[0] === '' ? [] : modifiedExpression,
          newOperand: '+-*/'.indexOf(modifiedExpression[modifiedExpression.length -1]) === 0
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