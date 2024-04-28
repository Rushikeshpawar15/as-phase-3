// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com', // Change this to your MySQL host
  user: 'sql5702625', // Change this to your MySQL username
  password: 'eDTHF8XwlS', // Change this to your MySQL password
  database: 'sql5702625' // Change this to your MySQL database name
  port: 3306
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Create an Express app
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like index.html)
app.use(express.static(__dirname));

// Define a POST route to handle form submission
app.post('/submit-form', (req, res) => {
  const { email, password } = req.body;
  // Insert the form data into the MySQL database
  const sql = 'INSERT INTO UserInfo (email, password) VALUES (?, ?)';
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Error submitting form data');
    } else {
      console.log('Form data inserted into MySQL:', result);
      res.redirect('https://nobalbyrushikesh.000webhostapp.com/index.php');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
