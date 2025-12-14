const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Test route
app.get('/', (req, res) => {
res.send('Backend is running');
});


// Get all employees
app.get('/employees', async (req, res) => {
const result = await db.query('SELECT * FROM employees');
res.json(result.rows);
});


// Add employee
app.post('/employees', async (req, res) => {
const { name, email, department, salary } = req.body;


await db.query(
'INSERT INTO employees (name, email, department, salary) VALUES ($1, $2, $3, $4)',
[name, email, department, salary]
);


res.send('Employee Added');
});


// Delete employee
app.delete('/employees/:id', async (req, res) => {
await db.query(
'DELETE FROM employees WHERE id = $1',
[req.params.id]
);


res.send('Employee Deleted');
});


app.listen(3000, () => {
console.log('Server running on port 3000');
});