/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// Components
import Display from './Display';
import Controls from './Controls';
import Operators from './Operators';
import Keypad from './Keypad';

const Calculator = () => {
  const [expression, setExpression] = useState({operand: null, operator: null})
  const [display, setDisplay] = useState('0')
  const [newInput, setNewInput] = useState(true)
  const [reset, setReset] = useState(true)

  useEffect(() => {
    if (reset) {
      setDisplay(display)
      setNewInput(true)
    } else {
      setDisplay(expression.operand || display)
      setNewInput(true)
    }
    
  }, [expression])
  
  const evaluateExpression = (a,b, operator) => {
    const operators = {
      '/': (a,b) => a/b,
      '*': (a,b) => a*b,
      '+': (a,b) => a+b,
      '-': (a,b) => a-b, 
    }
    return operators[operator](parseFloat(a), parseFloat(b)).toString()
  }
  
  const handleReset = () => {
    switch (reset) {
      default:
        break;
      case false:
        // Clear the display data to re-enter
        setDisplay('0');
        setReset(true)
        break;
      case true:
        setDisplay('0');
        setExpression([]);
        break;
    }
  }

  const handleSignChange = () => {
    if (display !== '0') {
      setDisplay(display => {
        if (display.indexOf('-') === 0){
          return display.slice(1)
        } else {
          return '-' + display
        }
      })
    }
  }

  const handlePercent = () => {
    if (display !== '0') {
      setDisplay(display => '0.0' + display)
    }
  }

  const handleOperator = (value) => {
    // Push the display to the expression state and add the operator
    switch (value) {
      case '=':
        if (expression.operator) {
          setExpression(expression => {
            return {
              ...expression,
              operand: evaluateExpression(expression.operand, display, expression.operator),
              operator: null
            }
          })
        }
        break;
      default:
        if (!expression.operator && expression.operand == null) {
          console.log('in a')
          setExpression(expression => (
            {
              ...expression, 
              operand: display,
              operator: value
            }
          ))
          } else if (!expression.operator) {
            console.log('in b')
              setExpression(expression => (
                {
                ...expression,
                operator: value
              }
            ))
          
        } else {
          console.log('in c')
          setExpression(expression => {
            return {
              ...expression,
              operand: evaluateExpression(expression.operand, display, expression.operator),
              operator: value
            }
          })
        }    
    }    
  }
  const handleKeypadPress = (value) => {
    if (newInput) {
      switch (value){
        case '.':
          setDisplay('0.')
          break;
        default:
          setDisplay(value)
      }
      setNewInput(false)
    } else {
      switch (value) {
      case '.':
        if (value === '.' && display.indexOf('.') === -1) {
          setDisplay(display => display + value)
        }
        break;
      default:
        if (display === '0') {
          setDisplay(value)
        } else {
          setDisplay(display => display + value)
        }
    }   
    }
    setReset(false)
    
  }

  return (
    <div className="Calc-app">
      <Display output={display} />
      <div>
      <Controls 
        reset={reset}
        handleReset={handleReset} 
        handleSignChange={handleSignChange} 
        handlePercent={handlePercent}
      />
      <Keypad 
        handleKeypadPress={handleKeypadPress}
      />
      </div>
      
      <Operators
        handleOperator={handleOperator}
      />
      
        
    </div>
  )
}

export default Calculator;