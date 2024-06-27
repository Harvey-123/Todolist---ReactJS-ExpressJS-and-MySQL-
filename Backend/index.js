const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'todolistdb'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Failed to connect to the database', err);
        return;
    }
    console.log('Connected to Database');
});

// Server Connection
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Add a new task
app.post('/add', (req, res) => {
    const task = req.body.task;
    const query = 'INSERT INTO todos (task) VALUES (?)';
    db.query(query, [task], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ id: result.insertId, task: task, done: false });
        }
    });
});

// Fetch all tasks
app.get('/get', (req, res) => {
    const query = 'SELECT * FROM todos';
    db.query(query, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
    });
});

// Edit or update a task (mark as done)
app.put('/put/:id', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE todos SET done = TRUE WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Delete a task
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
