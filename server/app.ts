import express, { Request, Response } from 'express';
import path from 'path';
import mixRoutes from './routes/mixRoutes';
import downloadMixController from './controllers/downloadMixController';
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

// Helper function to render markdown content from a file
const renderMarkdown = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return marked(fileContent) as string; // Convert markdown to HTML
};

// Define a route for the home page
app.get('/', (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../Design Docs/API.md');
  const htmlContent = renderMarkdown(filePath);
  res.render('docs', { md: htmlContent });
});

// Route for server documentation
app.get('/server', (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../HowToStart.md');
  const htmlContent = renderMarkdown(filePath);
  res.render('docs', { md: htmlContent });
});

// Route for README.md
app.get('/server/README.md', (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../README.md');
  const htmlContent = renderMarkdown(filePath);
  res.render('docs', { md: htmlContent });
});

// Use mixRoutes for handling mix-related API routes
app.use('/api/mixes', mixRoutes);

// Use downloadMixController for download mix functionality
app.use('/api/mixes', downloadMixController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;