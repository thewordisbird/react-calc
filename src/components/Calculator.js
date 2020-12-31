/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
//Components
import Display from './Display';
import Keypad from './Keypad';
import Operators from './Operators';
// CSS
import '../App.css'
// Utils
import { infixToPostFix, evalPostFix } from '../utils/evaluate'
/**
 * Constants 
 */
const INITIAL_STATE = {
  result: '',
  expression: [],
  newExpression: true,
  newOperand: true
}
/**
 * Custom Hooks
 */

const useCalcState = (initialState=INITIAL_STATE) =>{
  // Handle state and state updated for Calculator
  const [calcState, setCalcState] = useState(initialState)
  const { result, expression, newExpression, newOperand } = calcState
  
  // State update for new Expression
  const resetExpression = (initialValue=null) => {
    setCalcState(state => {
      const { result } = state
      return {
        result: initialValue ? result : '',
        expression: initialValue ? [result] : [],
        newExpression: true,
        newOperand: true
      }
    })
  }

  const clearExpression = () => {
    setCalcState(state => {
      const { expression } = state
      const strExpression = expression.join(' ')
      const modifiedExpression = strExpression.slice(0, -1).trim().split(' ')
      return {
        ...state,
        expression: modifiedExpression[0] === '' ? [] : modifiedExpression,
        newOperand: '+-*/'.indexOf(modifiedExpression[modifiedExpression.length -1]) === 0
      }
    })
  }
  // State update for result change
  const updateResult = (newResult) => {
    setCalcState(state =>(
      {
        ...state,
        result: newResult
      }
    ))
  }
  // State updates for operand input
  const addOperand = (operand) => {
    setCalcState(state => {
      const { expression } = state
      return (
        {
          ...state,
          expression: [...expression, operand],
          newExpression: false,
          newOperand: false
        }
      )
    })
  }

  const updateOperand = (operand) => {
    setCalcState(state => {
      const { expression } = state
      const updatedOperand = expression[expression.length-1] + operand
      return (
        {
          ...state,
          expression: [...expression.slice(0,-1), updatedOperand]
        }
      )
    })
  }

  // State updates for operator input
  const addOperator = (operator) => {
    setCalcState(state => {
      const { expression } = state
      return (
        {
          ...state,
          expression: [...expression, operator],
          newExpression: false,
          newOperand: true
        }
      )
    })
  }

  const updateOperator = (operator) => {
    setCalcState(state => {
      const { expression } = state
      return (
        {
          ...state,
          expression: [...expression.slice(0,-1), operator]
        }
      )
    })
  }
  
  return {calcState, resetExpression, clearExpression, updateResult, addOperand, updateOperand, addOperator, updateOperator}
}
const Calculator = () => {
  const { calcState, resetExpression, clearExpression, updateResult, addOperand, updateOperand, addOperator, updateOperator } = useCalcState()
  const { result, expression, newExpression, newOperand } = calcState

  useEffect(() => {
    // Evaluate the expression whenver the expression string changes
    const postFix = infixToPostFix(expression)
    const evalResult = evalPostFix(postFix)
    if (!isNaN(evalResult)) {
      updateResult(evalResult)
    }
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

  const handleOperandPress = (operand) => {
    // Set Operand to display. This includes all numbers and decimal
    const validChar = () => {
      if (expression.length > 0) {
        const currentOperand = expression[expression.length - 1]
        switch (operand) {
          case '.':
            return currentOperand.indexOf(operand) === -1
          case '0':
            return !(currentOperand.indexOf(operand) === 0 && currentOperand.length === 1)
          default:
            return true
        }
      }
      return true
    }
    if (validChar()) {
      if (newOperand) {
        addOperand(operand)
      } else {
        updateOperand(operand)
      }
    }      
  }

  const handleOperatorPress = (operator) => {
    if (newExpression || !newOperand) {
      // Add a new operator to the expression
      addOperator(operator)
    } else if (newOperand && expression.length > 1) {
      // Update the current operator
      updateOperator(operator)
    } else {
      // Allow a leading opperator if it's '-'
      if (operator === '-') {
        addOperator('-')
      }
    }
  }
    
  const handleEqualPress = () => {
    resetExpression(result)
  }

  const handleClearPress = () => {
    clearExpression()
  }

  return (
    <div className="Calc-app">
      <Display result={result} expression={expression.join(' ')} />
      <div className="Calc-keys">
        <Keypad handleOperandPress={handleOperandPress} handleEqualPress={handleEqualPress} />
        <Operators handleOperatorPress={handleOperatorPress} handleClearPress={handleClearPress} />
      </div>
    </div>
  )
}
export default Calculator;