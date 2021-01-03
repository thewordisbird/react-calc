import { useState, useEffect } from 'react';
// Utils
import { infixToPostFix, evalPostFix } from '../utils/evaluate'

const INITIAL_STATE = {
  result: '',
  expression: [],
  newExpression: true,
  newOperand: true
}

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

  // Keypress logic
  const validChar = (operand) => {
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

  const onOperandPress = (operand) => {
    if (validChar()) {
      if (newOperand) {
        addOperand(operand)
      } else {
        updateOperand(operand)
      }
    }      
  }

  const onOperatorPress = (operator) => {
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

  const onClearPress = () => {
    clearExpression()
  }
  
  const onEqualPress = () => {
    resetExpression(result)
  }

  const onKeyPress = ({type, key}) => {
    switch (type) {
      case 'operand':
        onOperandPress(key);
        break;
      case 'operator':
        onOperatorPress(key);
        break;
      case 'equal':
        onEqualPress();
        break;
      case 'clear':
        onClearPress();
        break;
      default:
        break;
    }
  }
  
  // Recalculate as side effect to any change in expression
  useEffect(() => {
    // Evaluate the expression whenver the expression string changes
    const postFix = infixToPostFix(expression)
    const evalResult = evalPostFix(postFix)
    if (!isNaN(evalResult)) {
      updateResult(evalResult.toString())
    }
  }, [expression])

  return {calcState, onKeyPress}
}

export default useCalcState;