const express = require('express');
const path = require('path');
const mixRoutes = require('./routes/mixRoutes');

const app = express();
const PORT = 3001;

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

    // Use res.render() if you are rendering a view (with a template engine like EJS, Pug, etc.)
    // Example: res.render('homepage', { title, items });

    // If you are sending JSON data:
    res.json({ title, items }); // Use res.json() for sending JSON
});

// Use mixRoutes
app.use('/api/mixes', mixRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
