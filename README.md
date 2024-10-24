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
