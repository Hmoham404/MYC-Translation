const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const documentController = require('../controllers/documentController');

router.post('/translate', upload.single('file'), (req, res) => {
    documentController.translate(req, res);
});

module.exports = router;
