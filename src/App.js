import React, { useState, useEffect } from 'react';
// Components
import Display from './components/Display';
// import History from './components/History'
import Controls from './components/Controls';
import Operators from './components/Operators';
import Keypad from './components/Keypad';
// CSS
import './App.css'

const App = () => {
  const [expression, setExpression] = useState({operand: null, operator: null})
  const [display, setDisplay] = useState('0')
  const [newInput, setNewInput] = useState(true)
  const [reset, setReset] = useState(true)


  useEffect(() => {
    // Effect hook to handle updating the display after the expression is updated
    if (reset) {
      setDisplay(display)
      setNewInput(true)
    } else {
      setDisplay(expression.operand || display)
      setNewInput(true)
    }    
  }, [expression])

  useEffect(() => {
    // Effect hook to handle key entry functionality
    console.log('in effect')
    const handleUserKeyPress = (e) => {
      if ("0123456789.".indexOf(e.key) > -1) {
        handleKeypadPress(e.key)      
      } else if ("+-/*".indexOf(e.key) > -1) {
        handleOperator(e.key)
      } else if (e.key === 'Enter') {
        handleOperator('=')
      } else if (e.key === 'Backspace') {
        handleReset()
      }
    }

    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      console.log('running cleanup')
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [newInput, expression, display, reset])

  useEffect(() => {
    // Effect hook to handle key press styling to mimic mouse usage when
    // using a keypad to enter the data
    const findKey = (e) =>{
      let k
      if ("0123456789.".indexOf(e.key) > -1) {
        k = document.getElementById(`key-${e.key}`)
      } else if ("+-/*".indexOf(e.key) > -1) {
        k = document.getElementById(`key-${e.key}`)
      } else if (e.key === 'Enter') {
        k = document.getElementById('key-=')
      } else if (e.key === 'Backspace') {
        k = document.getElementById('key-C') || document.getElementById('key-AC')
      } else {
        k = null
      }
      return k
    }

    const addStyle = (e) => {
      console.log('logging',e.key)
      const k = findKey(e)
      console.log('loggin', k)
      console.log(k)
      if (k) {
        k.style.background = "lightslategray"
      }  
    }

    const removeStyle = (e) => {
      const key = findKey(e)
      if (key) {
        key.removeAttribute('style')
      }    
    }

    window.addEventListener('keydown', addStyle)
    window.addEventListener('keyup', removeStyle)

    return () => {
      window.removeEventListener('keydown', addStyle)
      window.removeEventListener('keyup', removeStyle)
    }
  }, [])
  
  
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
      setDisplay(display => (-1 * parseFloat(display)).toString())
    }
  }

  const handlePercent = () => {
    if (display !== '0'){
      setDisplay(display => (parseFloat(display) / 100).toString())
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
          setExpression(expression => (
            {
              ...expression, 
              operand: display,
              operator: value
            }
          ))
          } else if (!expression.operator) {
              setExpression(expression => (
                {
                ...expression,
                operator: value
              }
            ))          
        } else {
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

export default App;