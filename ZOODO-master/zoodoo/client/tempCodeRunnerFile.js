const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoodoo_sdgp',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID: ' + connection.threadId);
});

// Create a POST route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Insert the form data into the contact_details table
  const query = `INSERT INTO contact_details (Name, Email, Phone, Comment) VALUES (?, ?, ?, ?)`;
  connection.query(query, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Error inserting data into the table: ' + err);
      res.sendStatus(500);
      return;
    }
    console.log('Data inserted successfully');
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
