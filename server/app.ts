import express, { Request, Response } from 'express';
import path from 'path';
import mixRoutes from './routes/mixRoutes';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import AudioProcessor from './utils/algorithm';

// Create express app
const app = express();

// Load environment variables
dotenv.config();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

// JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload());

//Home page includes the README.md file
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../README.md'));
});

// Routes for mixes
app.use('/api/mixes', mixRoutes);

// Start server on PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const algorithm: AudioProcessor = new AudioProcessor();

export default app;
