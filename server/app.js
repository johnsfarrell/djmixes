const express = require('express');
const path = require('path');
const mixRoutes = require('./routes/mixRoutes');
const fs = require('fs');
const {marked} = require ('marked'); 

const app = express();
const PORT = 3001;

// Serve static files (like CSS)·
app.use(express.static(path.join(__dirname, 'public')));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory (optional if your EJS files are in a folder named 'views')
app.set('views', path.join(__dirname, 'views'));

// Define a route
app.get('/', (req, res) => {
   // Allow the docs.html template to 'include' markdown files
   // Solution from https://stackoverflow.com/questions/16369987/how-can-i-render-markdown-with-ejs-using-express-node-js
   
   var md = function (filename) {
        var filePath = path.join(__dirname, '../Design Docs/API.md');
        var include = fs.readFileSync (filePath, 'utf8');
        var html = marked(include);
  
        return html;
     };
  
     res.render ('docs', {"md": md});
});

// Use mixRoutes
app.use('/api/mixes', mixRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
