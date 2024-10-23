class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type; 
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function evaluateAST(ast, userData) {
    console.log('evaluating: ', ast);
    if (ast.type === 'operand') {
        const { key, operator, value } = ast; 
        console.log('Evaluating operand:', key, operator, value, ', user data:', userData[key]);

        switch (operator) {
            case '>': return userData[key] > parseFloat(value);
            case '<': return userData[key] < parseFloat(value);
            case '=': return userData[key] === value.replace(/['"]+/g, ''); 
            default: return false;
        }
    } else if (ast.type === 'operator') {
        const leftResult = evaluateAST(ast.left, userData);
        const rightResult = evaluateAST(ast.right, userData);
        if (ast.operator === 'AND') return leftResult && rightResult;
        if (ast.operator === 'OR') return leftResult || rightResult;
    }
    return false;
}


module.exports = { Node, evaluateAST };
