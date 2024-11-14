"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mixRoutes_1 = __importDefault(require("./routes/mixRoutes"));
const routes_1 = __importDefault(require("./routes/routes"));
const fs_1 = __importDefault(require("fs"));
const marked_1 = require("marked");
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
// Middleware to serve static files (like CSS)
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Enable file upload using express-fileupload
// Add file upload middleware with a file size limit
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 200 * 1024 * 1024 }, // Set the limit to 200MB
}));
// Middleware to parse JSON and URL-encoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory (optional if your EJS files are in a folder named 'views')
app.set('views', path_1.default.join(__dirname, 'views'));
var md = function (filename) {
    var path = __dirname + '/public/' + filename;
    var include = fs_1.default.readFileSync(path, 'utf8');
    var html = (0, marked_1.marked)(include);
    return html;
};
// Define a route for the home page
app.get('/', (req, res) => {
    res.render('homePage', { "md": md });
});
// Route for server documentation
app.get('/server', (req, res) => {
    res.render('server', { "md": md });
});
// Route for README.md
app.get('/server/README.md', (req, res) => {
    res.render('readme', { "md": md });
});
app.use('/', routes_1.default);
// Use mixRoutes for handling mix-related API routes
app.use('/api/mixes', mixRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
