# RuleEngine

RuleEngine is a 3-tier application designed to dynamically create, combine, and evaluate rules using an Abstract Syntax Tree (AST). It allows you to determine user eligibility based on a set of conditions such as age, income, or other attributes. The project consists of a frontend, backend, and a database, making it easy to manage and evaluate complex rules.

## Features

- **Create Rules:** Define rules based on conditions (e.g., `age > 30`).
- **Combine Rules:** Combine multiple rules using logical operators like `AND` and `OR`.
- **Evaluate Rules:** Evaluate user data against the rules to determine eligibility.
## Project Structure
  	Rule_Engine/
  	│
  	├── backend/
  	│   ├── app.js
    |   ├── ast.js
  	│   ├── db.js
    |   ├── ruleController.js
  	│   ├── .env
    |
  	│
  	├── frontend/
  	│   ├── index.html
  	│   ├── styles.css
  	│   ├── script.js
  	│
  	├── node_modules/
  	├── package.json 
  	├── package-lock.json
  	├── README.md

## Installation and Setup
Follow these steps to set up and run the project locally.
### Prerequisites
- Node.js (v16 or higher)
- MySQL (v5.7 or higher)
- Git
### Steps:
##### 1. Clone the github repository to your preferred directory. Open Terminal and run:-
    git clone https://github.com/dhaheenrahman/Rule_Engine.git
    cd Rule_Engine
##### 2. Install the dependencies using following command:-
    npm install
##### 3. Create MySQL Database named 'rule_engine' and following tables(Better use a new terminal for mysql commands):
    CREATE DATABASE rule_engine;
    USE rule_engine;

    CREATE TABLE rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rule_name VARCHAR(255) NOT NULL,
    rule_json TEXT NOT NULL);
##### 4. Navigate to 'backend' directory: `cd backend`<br> Create file '.env' and paste the below text in this file and configure your MySQL Credentials here
	DB_USER=your_user (Eg: root)
	DB_HOST=your_host (Eg: localhost)
	DB_NAME=your_db_name (Eg: rule_engine)
	DB_PASSWORD=your_password
	DB_PORT=your_port (Eg:3306)
##### 5. Run the file 'app.js':-
    node app.js
Now the server will be running on:- <br>
    `http://localhost:3000`
##### 6. Navigate to the 'frontend' folder and open 'index.html' in a browser. <br>
Your Rule_Engine is now ready to use. <br>
Note:- while creating rules, Ensure spacing between operators and operands. Also 'AND' and 'OR' should be in Upper case. 

### Working
#### 1. Create Rule:
Rules can be created using a unique rule name and a rule string. While creating rules please ensure:-<br>
- Operators and Operands are space seperated.<br>
Eg: salary > 30000 ✅<br>
Eg: salary>30000 ❌
- AND and OR should be in uppercase.<br>
  Eg: age > 30 AND experience > 3 ✅<br>
 Eg: age > 30 and experience > 3 ❌
- Use single quotes for non-numerical values. <br>
Eg: department = 'sales' ✅<br>
Eg: department = sales ❌
![Create_Rule_Snapshot](https://github.com/user-attachments/assets/d0f343f0-108a-44b3-881a-cb4701fa8646)
#### 2. Combine Rules:
Multiple existing rules can be combined to a new rule with new rule name. While combining rules please ensure:-<br>
- Enter the names of rules to be combined in a manner that one line contains only one rule.
![Combine_Rules_Snapshot](https://github.com/user-attachments/assets/dbb9a7c2-2f84-4e32-b412-2fb2f2b9c7bc)
#### 3. Evaluate Rule:
Rules can be evaluated against user data. To evaluate a rule against a data:<br>
- Copy the JSON string of rule from the database and paste it in the rule JSON section.
- Input user data as JSON string.
- Example user data: `{"age": 35, "department": "Sales", "salary": 60000, "experience": 3} `
![Evaluate_Rule_Snapshot](https://github.com/user-attachments/assets/4bdc517c-d2e7-4a27-9862-d1d4a9fb4b92)

 ## Technology Stack
### Backend

- Node.js
- Express
- MySQL
### Frontend
- HTML
- CSS
- JavaScript

## Usage
1. Launch the server and access the frontend in `index.html`.
2. Create individual and combined rules.
3. Evaluate the rules against user data.
4. Find out whether the user is eligible or not.
