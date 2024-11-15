import express, { Request, Response } from 'express';

const router = express.Router();

// About route
router.get('/about', (req: Request, res: Response): void => {
    const title = 'About Us';
    res.send({"about":"about"});
});

// Contact route
router.get('/contact', (req: Request, res: Response): void => {
    const title = 'Contact Us';
    res.send({"contact":"contact"});
});

// // 404 route (optional)
// router.use((req: Request, res: Response): void => {
//     res.status(404).render('404', { title: '404 - Page Not Found' });
// });

export default router;