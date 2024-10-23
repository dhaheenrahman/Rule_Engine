
document.getElementById('create-rule-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ruleName = document.getElementById('ruleName').value;
    const ruleString = document.getElementById('ruleString').value;

    fetch('http://localhost:3000/create-rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rule_name: ruleName, rule: ruleString })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error); 
        } else {
            alert('Rule created: ' + JSON.stringify(data));
            const astDisplay = document.getElementById('astDisplay');
            astDisplay.innerHTML = ''; 
            const astTree = renderAST(data.ast);
            astDisplay.appendChild(astTree);
        }
    })
    .catch(error => console.error('Error:', error));
});

 
document.getElementById('combine-rules-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const operator = document.getElementById("combineOperator").value
    const ruleNames = document.getElementById('combineRulesInput').value.trim().split('\n');
    const combinedRuleName = document.getElementById("combinedRuleName").value

    fetch('http://localhost:3000/combine-rules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rule_names: ruleNames,operator:operator,rule_name:combinedRuleName }) // Updated to send rule_ids
    })
    .then(response => {
        if (!response.ok) {
            // window.alert("Invalid Rule. Try again!")
            throw new Error('sa ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Combined AST:', data.combinedAST);
        window.alert('Combined rule created Successfully ')
    
        const combinedASTDisplay = document.getElementById('combinedASTDisplay');
        combinedASTDisplay.innerHTML = '';
    
        const combinedASTTree = renderAST(data.combinedAST);
        if (combinedASTTree) { 
            combinedASTDisplay.appendChild(combinedASTTree);
        } else {
            combinedASTDisplay.innerHTML = '<p>No valid AST to display.</p>';
        }
    })
    
    .catch(error => {
        alert('Error combining rules: Try using different rule name');
        console.error('Error:', error);
    });
});


document.getElementById('evaluate-rule-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const astInput = document.getElementById('astInput').value.trim();
    const userDataInput = document.getElementById('userData').value.trim();
    console.log('AST JSON sent:', astInput);
    console.log('User Data JSON sent:', userDataInput);

    if (!astInput || !userDataInput) {
        alert('Please fill in both fields.');
        return;
    }

    const ast = JSON.parse(astInput);
    const userData = JSON.parse(userDataInput);

    fetch('http://localhost:3000/evaluate-rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ast, user_data: userData })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('evaluationResult').innerText = `Eligible: ${data.eligible}`;
    })
    .catch(error => {
        alert('Error evaluating rule: ' + error.message);
        console.error('Error:', error);
    });
});


function renderAST(node) {
    if (!node) return null;

    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'node';

    if (node.type === 'operator') {
        nodeDiv.innerHTML = `<span class="operator">${node.operator}</span>`;
    }
    else if (node.type === 'operand') {
        nodeDiv.innerHTML = `<span class="operand">${node.key} ${node.operator} ${node.value}</span>`;
    }

    const leftDiv = renderAST(node.left);
    const rightDiv = renderAST(node.right);

    if (leftDiv) nodeDiv.appendChild(leftDiv);
    if (rightDiv) nodeDiv.appendChild(rightDiv)
    return nodeDiv;
}


