
const Key = ({ text, value, type, width, handleClick }) => (
  <button 
    className={`Calc-${width ? width+'-' : ''}key ${type}-key`}
    value={value}
    onClick={() => handleClick(value)}
  >
    {text}
  </button>

)

export default Key;