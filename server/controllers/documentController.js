const fs = require('fs');
const path = require('path');
const excelSurgery = require('../services/ExcelSurgery');
const wordSurgery = require('../services/WordSurgery');
const pdfSurgery = require('../services/PdfSurgery');
const translationService = require('../services/translationService');

class DocumentController {
  async translate(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { targetLanguage } = req.body;
      if (!targetLanguage) {
        return res.status(400).json({ error: 'Target language required' });
      }

      const inputPath = req.file.path;
      const fileExt = path.extname(req.file.originalname).toLowerCase();
      const outputFilename = `translated-${Date.now()}${fileExt}`;
      const outputPath = path.join(__dirname, '../outputs', outputFilename);

      // Ensure outputs directory exists
      if (!fs.existsSync(path.join(__dirname, '../outputs'))) {
        fs.mkdirSync(path.join(__dirname, '../outputs'), { recursive: true });
      }

      let result;

      // Route based on file type
      if (fileExt === '.xlsx') {
        result = await excelSurgery.process(inputPath, outputPath, targetLanguage);
      } else if (fileExt === '.docx') {
        result = await wordSurgery.process(inputPath, outputPath, targetLanguage);
      } else if (fileExt === '.pdf') {
        result = await pdfSurgery.process(inputPath, outputPath, targetLanguage);
      } else if (fileExt === '.txt') {
        // Simple text file translation
        const text = fs.readFileSync(inputPath, 'utf-8');
        const translated = await translationService.translateText(text, targetLanguage);
        fs.writeFileSync(outputPath, translated, 'utf-8');
        result = outputPath;
      } else {
        return res.status(400).json({ error: 'Unsupported file type' });
      }

      // Clean up input file
      fs.unlinkSync(inputPath);

      // Send file for download
      res.download(outputPath, outputFilename, (err) => {
        if (err) console.error('Download error:', err);
        // Clean up output file after download
        setTimeout(() => {
          try {
            fs.unlinkSync(outputPath);
          } catch (e) {
            console.error('Cleanup error:', e);
          }
        }, 1000);
      });
    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DocumentController();
