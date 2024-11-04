const express = require('express')
const path = require('path');
const mixRoutes = require('./routes/mixRoutes');

const app = express()
const PORT = 3000

// Set the view engine to EJS
// TODO: update this when implement frontend
app.set('view engine', 'ejs');

// Set the views directory (optional if your EJS files are in a folder named 'views')
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.get('/', (req, res) => {
    const title = 'DJ Mixes';
    const items = [
        { name: 'Item 1', description: 'Description for item 1' },
        { name: 'Item 2', description: 'Description for item 2' },
        // Add more items as needed
    ];
    
    // Render the EJS template and pass data to it
    res.render('homepage', {title, items});
});

// mixRoute
app.use('/mix', mixRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;