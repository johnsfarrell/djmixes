// server/routes/mixes.js
const express = require('express');
const router = express.Router();
const mixController = require('../controllers/mixController');
const multer = require('multer');

// Configure multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/uploads'); // Save uploads to this path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// POST /api/mixes/upload route for mix upload
router.post('/upload', upload.single('file'), mixController.uploadMix);

module.exports = router;
