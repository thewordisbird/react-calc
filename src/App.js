import { useState } from 'react'
import Key from './components/Key'
import './App.css';

const App = () => {
  const [input, setInput] = useState(0)
  const [operand, setOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  
  const evaluateOperation = (a, b, callback) => {
    return callback(a,b)
  }

  const handleInput = (value) => {
    setInput( operand => (operand * 10) + value)
  }

  const handleOperator = (value) => {
    const operators = {
      '+': function(a,b){return a + b},
      '-': function(a,b){return a - b} ,
      '/': function(a,b){return a / b} ,
      '*': function(a,b){return a * b} 
    }

    if (operator) {
      // Evaluate current operation and then set
      const newOperand = evaluateOperation(operand, input, operators[operator])
      setOperand(newOperand)
      setInput(newOperand)
    } else {
      setOperand(input)
      setInput(0)
    }
    setOperator(value)
  }

  



  return (
  <div className="container">
    <div className="Calc-app">
    <div className="Calc-row">
      <div className="Calc-display">
        {input}
      </div>
    </div>
      <div className="Calc-row">
        <Key text={operand ? 'C': 'AC'} value={operand ? 'C': 'AC'} type="control" handleClick={() => setInput(0)}/>
        <Key text="+/-" value="+/-" type="control" handleClick={() => setInput(input => -input)}/>
        <Key text="%" value="%" type="control" handleClick={() => setInput(input => input/100)}/>
        <Key text="&#247;" value="/" type="op" handleClick={handleOperator}/>
      </div>
      <div className="Calc-row">
        <Key text="7" value={7} type="num" handleClick={handleInput}/>
        <Key text="8" value={8} type="num" handleClick={handleInput}/>
        <Key text="9" value={9} type="num" handleClick={handleInput}/>
        <Key text="&#215;" value="*" type="op" handleClick={handleOperator}/>
      </div>
      <div className="Calc-row">
        <Key text="4" value={4} type="num" handleClick={handleInput}/>
        <Key text="5" value={5} type="num" handleClick={handleInput}/>
        <Key text="6" value={6} type="num" handleClick={handleInput}/>
        <Key text="-" value="-"  type="op" handleClick={handleOperator}/>
      </div>
      <div className="Calc-row">
        <Key text="1" value={1} type="num" handleClick={handleInput}/>
        <Key text="2" value={2} type="num" handleClick={handleInput}/>
        <Key text="3" value={3} type="num" handleClick={handleInput}/>
        <Key text="+" value="+" type="op" handleClick={handleOperator}/>
      </div>
      <div className="Calc-row">
        <Key text="0" value={0} type="num" width="double" handleClick={handleInput}/>
        <Key text="." value="." type="num" />
        <Key text="=" value="=" type="op" />
        
      </div>
    </div>
  </div>
  
)}

export default App;
