const operators = {
  '/': {func: (a,b) => a/b, prec: 0},
  '*': {func: (a,b) => a*b, prec: 0},
  '+': {func: (a,b) => a+b, prec: 1},
  '-': {func: (a,b) => a-b, prec: 1}
}

export const infixToPostFix = (exp) => {
  if (exp.length === 1) {
    return exp
  } 
  
  const output = exp.reduce((acc, cur) => {
    if (cur != ""){
    if (cur in operators) {
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

export const evalPostFix = (postFixExp) => {
  if (postFixExp.length > 2){
    
    return  postFixExp.reduce((acc, cur) => {
      if (cur in operators) {
        const b = acc.pop()
        const a = acc.pop() || 0 // Handles case where minus sign is used to make first operand negative
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


