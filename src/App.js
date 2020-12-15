import React from 'react'
// Components
import Calculator from './components/Calculator'

// CSS
import './App.css';



const App = () => {
  // const [input, setInput] = useState('0')
  // // eslint-disable-next-line no-unused-vars
  // const [operand, setOperand] = useState(null)
  // const [decimal, setDecimal] = useState(false)
  // const [operator, setOperator] = useState(null)
  // const [newInput, setNewInput] = useState(true)
  // const [reset, setReset] = useState(true)

  // const evaluateOperation = (a, b, callback) => {
  //   // Evaluate the operation with operands a and b.
  //   return callback(parseFloat(a),parseFloat(b))
  // }

  // const handleInput = (value) => {
  //   // Handle keypad input. Numbers, and decimal.
  //   const nums = '1234567890'
  //   if (nums.indexOf(value) > -1 && decimal === false) {
  //     if (newInput === true) {
  //       setInput(value)
  //       setNewInput(false)
  //     } else {
  //       setInput( input => ((parseInt(input) * 10) + parseInt(value)).toString())
  //     }
  //     setReset(false)
  //   } else if (nums.indexOf(value) > -1 && decimal === true) {
  //     setInput( input => {
  //       const indexOfDecimal = input.indexOf('.')
  //       const left = input.slice(0, indexOfDecimal)
  //       const right = input.slice(indexOfDecimal + 1)
  //       const updatedRight = (right === '') 
  //                             ? value
  //                             : ((parseInt(right) * 10) + parseInt(value)).toString()
  //       console.log(left, updatedRight)
  //       return left + '.' + updatedRight
  //     })
  //   } else if (value === '.'){
  //       if (newInput) {
  //         setInput('0.')
  //       } else {
  //         setInput(input => input + '.')
  //       }
  //       setDecimal(true)
  //   }
  // }

  // const handleOperator = (value) => {
  //   // Handle operator click. This will either stage the operator for the
  //   // second operand to be entered, or evaluate the staged operator, set the
  //   // output to the operand and stage the new operator.
  //   if (operator && newInput === false) {
  //     // Evaluate current operation and then set
  //     setOperand(operand => {
  //       const newOperand = evaluateOperation(operand, input, OPERATORS[operator])
  //       setInput(newOperand)
  //       return newOperand
  //     })
  //   } else {
  //     setOperand(operand => operand || input)
  //   }
  //   setOperator(value)
  //   setNewInput(true)
  // }

  // const handleEqual = () => {
  //   // Handle equal button click. Evaluates the staged operation and sets
  //   // result to operand
  //   if (operator) {
  //     setOperand(operand => {
  //       const newOperand = evaluateOperation(operand, input, OPERATORS[operator])
  //       setInput(newOperand)
  //       return newOperand
  //     })
  //   }
  //   setOperator(null)
  //   setNewInput(true)
  // }

  // const handleClear = () => {
  //   // Handles C or AC button press
  //   if (reset) {
  //     setInput(0)
  //     setOperand(null)
  //     setOperator(null)
  //     setNewInput(true)
  //   } else {
  //     setInput(0)
  //     setReset(true)
  //   }
  // }

//   return (
//   <div className="container">
//     <div className="Calc-app" >
//     <div className="Calc-row">
//       <Display output={input} />
//     </div>
//       <div className="Calc-row">
//         <Key text={reset ? 'AC': 'C'} value={reset ? 'AC': 'C'} type="control" handleClick={handleClear}/>
//         <Key text="+/-" value="+/-" type="control" handleClick={() => setInput(input => (-parseFloat(input)).toString())}/>
//         <Key text="%" value="%" type="control" handleClick={() => setInput(input => (parseFloat(input)/100).toString())}/>
//         <Key text="&#247;" value="/" type="op" handleClick={handleOperator}/>
//       </div>
//       <div className="Calc-row">
//         <Key text="7" value={"7"} type="num" handleClick={handleInput}>7</Key>
//         <Key text="8" value={"8"} type="num" handleClick={handleInput}/>
//         <Key text="9" value={"9"} type="num" handleClick={handleInput}/>
//         <Key text="&#215;" value="*" type="op" handleClick={handleOperator}/>
//       </div>
//       <div className="Calc-row">
//         <Key text="4" value={"4"} type="num" handleClick={handleInput}/>
//         <Key text="5" value={"5"} type="num" handleClick={handleInput}/>
//         <Key text="6" value={"6"} type="num" handleClick={handleInput}/>
//         <Key text="-" value="-"  type="op" handleClick={handleOperator}/>
//       </div>
//       <div className="Calc-row">
//         <Key text="1" value={"1"} type="num" handleClick={handleInput}/>
//         <Key text="2" value={"2"} type="num" handleClick={handleInput}/>
//         <Key text="3" value={"3"} type="num" handleClick={handleInput}/>
//         <Key text="+" value="+" type="op" handleClick={handleOperator}/>
//       </div>
//       <div className="Calc-row">
//         <Key text="0" value={"0"} type="num" width="double" handleClick={handleInput}/>
//         <Key text="." value="." type="num" handleClick={handleInput}/>
//         <Key text="=" value="=" type="op" handleClick={handleEqual}/>
//       </div>
//     </div>
//   </div>
// )}

return (
  <div className="container">
    <Calculator />
  </div>
)}

export default App;
