const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3100;

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

app.use(express.json());

// Enable CORS
app.use(cors());

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

// Create a GET route to fetch all contact details
app.get('/contact-details', (req, res) => {
  // Fetch all rows from the contact_details table
  const query = 'SELECT * FROM contact_details';
  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching contact details: ' + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});


// Create a GET route to fetch data about a specific food item
app.get('/food-recipes', (req, res) => {
  const foodId = req.query.foodId;

  // Fetch the data for the specified food ID from the food_recipes table
  const query = 'SELECT * FROM food_recipes WHERE Food_ID = ?';
  connection.query(query, [foodId], (err, rows) => {
    if (err) {
      console.error('Error fetching food recipe data: ' + err);
      res.sendStatus(500);
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'Food recipe not found' });
      return;
    }

    res.json(rows[0]);
  });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
