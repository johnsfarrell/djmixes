const express = require('express');
const path = require('path');
const mixRoutes = require('./routes/mixRoutes');
const fs = require('fs');
const { marked } = require('marked');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload'); // Import express-fileupload

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Use PORT from .env if available

// Middleware to serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Enable file upload using express-fileupload
app.use(fileUpload());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (optional if your EJS files are in a folder named 'views')
app.set('views', path.join(__dirname, 'views'));

// Define a route for the home page
app.get('/', (req, res) => {
  // Function to render markdown content from a file
  const renderMarkdown = (filename) => {
    const filePath = path.join(__dirname, '../Design Docs/API.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return marked(fileContent); // Convert markdown to HTML
  };

  res.render('docs', { md: renderMarkdown });
});

// Docs about how to start the server
app.get('/server', (req, res) => {
    var md = function (filename) {
            var filePath = path.join(__dirname, '../HowToStart.md');
            var include = fs.readFileSync (filePath, 'utf8');
            var html = marked(include);
      
            return html;
         };
      
         res.render ('docs', {"md": md});
    });
   
   
   // README.md
    app.get('/server/README.md', (req, res) => {
       var md = function (filename) {
            var filePath = path.join(__dirname, '../README.md');
            var include = fs.readFileSync (filePath, 'utf8');
            var html = marked(include);
      
            return html;
         };
      
         res.render ('docs', {"md": md});
    });
   

// Use mixRoutes for handling mix-related API routes
app.use('/api/mixes', mixRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
