"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// About route
router.get('/about', (req, res) => {
    const title = 'About Us';
    res.send({ "about": "about" });
});
// Contact route
router.get('/contact', (req, res) => {
    const title = 'Contact Us';
    res.send({ "contact": "contact" });
});
// // 404 route (optional)
// router.use((req: Request, res: Response): void => {
//     res.status(404).render('404', { title: '404 - Page Not Found' });
// });
exports.default = router;
