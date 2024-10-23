const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const rulesController = require('./rulesController');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post('/create-rule', rulesController.createRule);
app.post('/combine-rules', rulesController.combineRules);
app.post('/evaluate-rule', rulesController.evaluateRule);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

