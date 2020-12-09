
const Key = ({ text, value, type, width, handleClick }) => (
  <div 
    className={`Calc-${width ? width+'-' : ''}key ${type}-key`}
    value={value}
    onClick={() => handleClick(value)}
  >
    {text}
  </div>
)

export default Key;