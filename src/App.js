import { useState } from 'react'
import Key from './components/Key'
import './App.css';

const App = () => {
  const [output, setOutput] = useState(0);
  const [result, setResult] = useState();
  const [key, setKey] = useState([]);
  const [op, setOp] = useState();
  
  const handleControl = () => {

  }

  const handleOp = () => {

  }

  const handleNum = (value) => {
    if (!key) {
      setKey(key => key.push(value))
      setOutput(key)
    }
  }

  



  return (
  <div className="container">
    <div className="Calc-app">
    <div className="Calc-row">
      <div className="Calc-display">
        {output}
      </div>
    </div>
      <div className="Calc-row">
        <Key text={result ? 'C': 'AC'} value={result ? 'C': 'AC'} type="control" />
        <Key text="+/-" value="+/-" type="control" />
        <Key text="%" value="%" type="control" />
        <Key text="&#247;" value="&#247;" type="op" />
      </div>
      <div className="Calc-row">
        <Key text="7" value={7} type="num" handleClick={handleNum}/>
        <Key text="8" value={8} type="num" handleClick={handleNum}/>
        <Key text="9" value={9} type="num" handleClick={handleNum}/>
        <Key text="&#215;" value="&#215;" type="op" />
      </div>
      <div className="Calc-row">
        <Key text="4" value={4} type="num" handleClick={handleNum}/>
        <Key text="5" value={5} type="num" handleClick={handleNum}/>
        <Key text="6" value={6} type="num" handleClick={handleNum}/>
        <Key text="+" value="+"  type="op" />
      </div>
      <div className="Calc-row">
        <Key text="1" value={1} type="num" handleClick={handleNum}/>
        <Key text="2" value={2} type="num" handleClick={handleNum}/>
        <Key text="3" value={3} type="num" handleClick={handleNum}/>
        <Key text="-" value="-" type="op" />
      </div>
      <div className="Calc-row">
        <Key text="0" value={0} type="num" width="double"/>
        <Key text="." value="." type="num" />
        <Key text="=" value="=" type="op" />
        
      </div>
    </div>
  </div>
  
)}

export default App;
