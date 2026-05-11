const fs = require('fs');
const path = require('path');
const busboy = require('busboy');
const ExcelSurgery = require('../../server/services/ExcelSurgery');
const WordSurgery = require('../../server/services/WordSurgery');
const PdfSurgery = require('../../server/services/PdfSurgery');
const translationService = require('../../server/services/translationService');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse multipart form data
    const bb = busboy({ headers: req.headers });
    let targetLanguage = '';
    let fileBuffer = null;
    let filename = '';
    let fileExt = '';

    bb.on('field', (fieldname, val) => {
      if (fieldname === 'targetLanguage') {
        targetLanguage = val;
      }
    });

    bb.on('file', (fieldname, file, info) => {
      filename = info.filename;
      fileExt = path.extname(filename).toLowerCase();
      const chunks = [];

      file.on('data', (data) => {
        chunks.push(data);
      });

      file.on('end', () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    await new Promise((resolve, reject) => {
      bb.on('close', resolve);
      bb.on('error', reject);
      req.pipe(bb);
    });

    if (!fileBuffer || !targetLanguage) {
      return res.status(400).json({ error: 'File and targetLanguage required' });
    }

    // Create temp directory for processing
    const tmpDir = '/tmp/tradction';
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const inputPath = path.join(tmpDir, `input-${Date.now()}${fileExt}`);
    const outputPath = path.join(tmpDir, `output-${Date.now()}${fileExt}`);

    // Write input file
    fs.writeFileSync(inputPath, fileBuffer);

    let result;

    // Route based on file type
    if (fileExt === '.xlsx') {
      result = await ExcelSurgery.process(inputPath, outputPath, targetLanguage);
    } else if (fileExt === '.docx') {
      result = await WordSurgery.process(inputPath, outputPath, targetLanguage);
    } else if (fileExt === '.pdf') {
      result = await PdfSurgery.process(inputPath, outputPath, targetLanguage);
    } else if (fileExt === '.txt') {
      const text = fs.readFileSync(inputPath, 'utf-8');
      const translated = await translationService.translateText(text, targetLanguage);
      fs.writeFileSync(outputPath, translated, 'utf-8');
      result = outputPath;
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Read output file
    const outputBuffer = fs.readFileSync(outputPath);

    // Clean up temp files
    try {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    } catch (e) {
      console.error('Cleanup error:', e);
    }

    // Send file
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="translated-${Date.now()}${fileExt}"`
    );
    res.send(outputBuffer);
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: error.message });
  }
}
