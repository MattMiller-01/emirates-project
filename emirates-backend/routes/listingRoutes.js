const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const Listing = require('../models/Listing');

router.post('/upload-image', upload.single('image'), (req, res) => {
    res.json({ filePath: req.file.path });
});

module.exports = router;
