/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
//Components
import Display from './components/Display';
import Keypad from './components/Keypad';
import Operators from './components/Operators';
// CSS
import './App.css'

const App = () => {
  console.log('rendering')
  const [result, setResult] = useState('')
  const [expression, setExpression] = useState('')
  const [input, setInput] = useState('0')
  const [newInput, setNewInput] = useState(true)

  const infixToPostFix = (exp) => {
    console.log(expression)
    const operators = {
      '/': {func: (a,b) => a/b, prec: 0},
      '*': {func: (a,b) => a*b, prec: 0},
      '+': {func: (a,b) => a+b, prec: 1},
      '-': {func: (a,b) => a-b, prec: 1}
    }
    
    const output = exp.split(' ').reduce((acc, cur) => {
      console.log('reduce cur', cur)
      if (cur != ""){
      if (cur in operators) {
        console.log('eval operator')
        // Move any operator out of opStack that has a lower or == precident
        const tempOpStack = [...acc.opStack]
        const tempOutput = [...acc.output] 
        while (tempOpStack.length !== 0 && operators[tempOpStack[tempOpStack.length - 1]].prec <= operators[cur].prec ) {
          
          tempOutput.push(tempOpStack.pop()) 
        }
        tempOpStack.push(cur)
      acc = {...acc, output: tempOutput, opStack:tempOpStack}
      } else {
        acc = {...acc, output: [...acc.output, cur]}
      }}
      return acc
    }, {output: [], opStack: []})

    // Move any remaining operators from opStack to output and return
      return [...output.output, ...output.opStack.reverse()]
  }

  const evalPostFix = (postFixExp) => {
    if (postFixExp.length > 2){
    const operators = {
      '/': {func: (a,b) => a/b, prec: 0},
      '*': {func: (a,b) => a*b, prec: 0},
      '+': {func: (a,b) => a+b, prec: 1},
      '-': {func: (a,b) => a-b, prec: 1}
    }

    return  postFixExp.reduce((acc, cur) => {
      if (cur in operators) {
        const b = acc.pop()
        const a = acc.pop()
        acc = [...acc, operators[cur].func(a,b)]
      } else {
        acc = [...acc, parseFloat(cur)]
      }
      return acc
    }, [])
  } else{
    return ''
  } 
}

  useEffect(() => {
    console.log(infixToPostFix(expression))
    const postFix = infixToPostFix(expression)
    const evalResult = evalPostFix(postFix)
    console.log(evalResult)
    setResult(result => {
      
      if  (!isNaN(evalResult)) {
        return evalResult.toString()
      } else {
        return result
      }
    })    
  }, [expression])


  const handleOperandPress = (char) => {
    // Set Operand to display. This includes all numbers and decimal
    const validChar = () => {
      switch (char) {
        case '.':
          return (input.indexOf(char) === -1)
        case '0':
          return !(input.indexOf(char) === 0 && input.length === 1)
        default:
          return true
      }
    }
    
    let updatedInput
    let updatedChar = char
    if (validChar()) {
      if (newInput) {
        switch (char) {
          case '.':
            console.log('in case')
            updatedChar = '0.'
            break
          default:
            updatedInput = char
        }
        setNewInput(false)
      } else {
        updatedInput = input + char
      }
      
      setInput(updatedInput)
      setExpression(expression => expression + updatedChar)
    }
  }


  const handleOperatorPress = (char) => {
    // Change operator if no operand has been added
    if (newInput) {
      setExpression(expression => expression.slice(0, -2) + char + ' ')
    } else {
      // Move current display to result.operand
    setExpression(expression => {
      if (expression.length === 0) {
        return input + ' ' + char
      } else {
        return expression + ' ' + char + ' '
      }
    })
    
    setNewInput(true)
  }
    }
    

  const handleEqualPress = () => {
    setExpression(result)
    setResult('')
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