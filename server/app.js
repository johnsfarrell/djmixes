const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./database/db_config');

const app = express();
const PORT = 3000;

app.use(express.json());

const uploadDir = path.join(__dirname, '../uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/mixes/upload', upload.single('mixFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;
  const file_url = path.join('uploads', filename);
  const { title, cover_url, tags, visibility, artist, album } = req.body;

  // Convert allow_download to boolean
  const allow_download = req.body.allow_download === 'on' ? true : false;

  const tagsString = Array.isArray(tags) ? tags.join(', ') : '';

  const query = `
    INSERT INTO mixes (user_id, title, file_url, cover_url, tags, visibility, allow_download, artist, album)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [1, title, file_url, cover_url || '', tagsString, visibility, allow_download, artist, album || ''];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Database insert failed:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(200).json({ message: 'Mix uploaded successfully', mix_id: results.insertId });
  });
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
