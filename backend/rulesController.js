const { Node, evaluateAST } = require('./ast');
const db = require('./db');

function createAST(ruleString) {
    function createOperandNode(key, operator, value) {
        if (!key || !operator || !value) {
            throw new Error('Invalid operand format. Each operand must have a key, operator, and value.');
        }
        return {
            type: 'operand',
            key: key.trim(),
            operator: operator.trim(),
            value: value.trim()
        };
    }

    function createOperatorNode(operator, leftNode, rightNode) {
        return {
            type: 'operator',
            operator: operator.trim(),
            left: leftNode,
            right: rightNode
        };
    }

    function parseRule(rule) {
        const tokens = rule.match(/(?:[^\s()]+|\(|\))/g);
        const stack = [];
        const operators = [];

        function popOperator() {
            const operator = operators.pop();
            const right = stack.pop();
            const left = stack.pop();
            stack.push(createOperatorNode(operator, left, right));
        }

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i].trim();
            if (token === ' ') continue; 
            if (token === 'AND' || token === 'OR') {
                while (operators.length && operators[operators.length - 1] !== '(') {
                    popOperator();
                }
                operators.push(token);
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length && operators[operators.length - 1] !== '(') {
                    popOperator();
                }
                operators.pop(); 
            } else {
                let key = token;
                let operator = null;
                let value = null;

                while (i + 1 < tokens.length && (operator === null || value === null)) {
                    i++;
                    if (operator === null) {
                        operator = tokens[i];
                    } else {
                        value = tokens[i];
                    }
                }

                stack.push(createOperandNode(key, operator, value));
            }
        }

        while (operators.length) {
            popOperator();
        }

        return stack[0];
    }

    return parseRule(ruleString);
}

exports.createRule = (req, res) => {
    const ruleName = req.body.rule_name;
    const ruleString = req.body.rule;

    if (!ruleName || !ruleString) {
        return res.status(400).json({ error: 'Rule name and rule string are required.' });
    }

    const checkSql = `SELECT COUNT(*) AS count FROM rules WHERE rule_name = ?`;
    db.query(checkSql, [ruleName], (checkErr, checkResults) => {
        if (checkErr) return res.status(500).json({ error: checkErr.message });

        if (checkResults[0].count > 0) {
            return res.status(400).json({ error: 'Rule name already exists. Please choose a different name.' });
        }

        try {
            const ast = createAST(ruleString);
            const serializedAST = JSON.stringify(ast);

            const sql = `INSERT INTO rules (rule_name, rule_json) VALUES (?, ?)`;
            db.query(sql, [ruleName, serializedAST], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Rule created successfully', ast });
            });
        } catch (err) {
            return res.status(400).json({ error: err.message }); // Return a 400 error with the message
        }
    });
};



exports.combineRules = (req, res) => {
    const ruleNames = req.body.rule_names; 
    const combineOperator = req.body.operator || 'AND'; 
    const combinedRuleName = req.body.rule_name;

    if (!ruleNames || ruleNames.length < 2) {
        return res.status(400).json({ error: "Please provide at least two rule names to combine." });
    }

    if (!combinedRuleName) {
        return res.status(400).json({ error: 'Combined rule name is required.' });
    }

    let combinedAST = null;

    const checkSql = `SELECT COUNT(*) AS count FROM rules WHERE rule_name = ?`;
    db.query(checkSql, [combinedRuleName], (checkErr, checkResults) => {
        if (checkErr) return res.status(500).json({ error: checkErr.message });

        if (checkResults[0].count > 0) {
            return res.status(400).json({ error: 'Combined rule name already exists. Please choose a different name.' });
        }

        db.query('SELECT rule_json FROM rules WHERE rule_name IN (?)', [ruleNames], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            results.forEach(row => {
                const ast = JSON.parse(row.rule_json);

                if (!combinedAST) {
                    combinedAST = ast;
                } else {
                    combinedAST = {
                        type: 'operator',
                        operator: combineOperator,
                        left: combinedAST,
                        right: ast
                    };
                }
            });

            const serializedAST = JSON.stringify(combinedAST);
            const sql = `INSERT INTO rules (rule_name, rule_json) VALUES (?, ?)`;
            db.query(sql, [combinedRuleName, serializedAST], (insertErr, result) => {
                if (insertErr) return res.status(500).json({ error: insertErr.message });

                res.json({
                    message: 'Combined rule created successfully',
                    combinedAST,
                    insertedId: result.insertId 
                });
            });
        });
    });
};




exports.evaluateRule = (req, res) => {
    const ast = req.body.ast; 
    const userData = req.body.user_data;
    console.log('AST received:', ast);
    console.log('User Data received:', userData);
    const result = evaluateAST(ast, userData);
    res.json({ eligible: result });
};

