// About route
router.get('/about', (req, res) => {
    const title = 'About Us';
    res.render('about', { title });
});

// Contact route
router.get('/contact', (req, res) => {
    const title = 'Contact Us';
    res.render('contact', { title });
});

// 404 route (optional)
router.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});