import express, { Request, Response } from 'express';
import path from 'path';
import mixRoutes from './routes/mixRoutes';
import fs from 'fs';
import { marked } from 'marked';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

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

// Enable express-fileupload middleware
app.use(fileUpload());

var md = function (filename: string) {
  var path = __dirname + '/public/' + filename;
  var include = fs.readFileSync (path, 'utf8');
  var html = marked (include);

  return html;
};

// Define a route for the home page
app.get('/', (req: Request, res: Response) => {
  res.render ('homePage', {"md": md});
});

// Route for server documentation
app.get('/server', (req: Request, res: Response) => {
  res.render ('server', {"md": md});
});

// Route for README.md
app.get('/server/README.md', (req: Request, res: Response) => {
  res.render ('readme', {"md": md});
});

// Use mixRoutes for handling mix-related API routes
app.use('/api/mixes', mixRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;