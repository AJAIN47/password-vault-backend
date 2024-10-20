const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy user storage (in-memory)
let users = []; // This array will hold user data temporarily
const applications = [
  { id: 1, name: "Application A", username: "userA", password: "passwordA" },
  { id: 2, name: "Application B", username: "userB", password: "passwordB" },
  { id: 3, name: "Application C", username: "userC", password: "passwordC" }
];

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists.' });
  }

  // Add user to the dummy storage
  users.push({ username, password }); // Storing raw password for now (not recommended)
  return res.json({ success: true, message: 'Signup successful!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Always return success
  return res.json({ success: true, message: 'Login successful!' });
});

// Applications endpoint
app.get('/applications', (req, res) => {
  return res.json(applications); // Return the list of applications
});

app.post('/applications', (req, res) => {
  const { name, username } = req.body; // Adjust fields as necessary

  // Add application to the dummy storage
  applications.push({ id: applications.length + 1, name, username });
  return res.json({ success: true, message: 'Application saved!', application: { name, username } });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});