const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const PDFDocument = require('pdfkit');
const translationService = require('./translationService');

class PdfSurgery {
    async process(inputPath, outputPath, targetLanguage) {
        console.log(`[PdfSurgery] Processing: ${inputPath}`);
        
        try {
            // Read PDF
            const fileBuffer = fs.readFileSync(inputPath);
            const pdfData = await pdfParse(fileBuffer);
            
            // Extract text
            let fullText = '';
            for (let i = 0; i < pdfData.numpages; i++) {
                fullText += pdfData.text + '\n';
            }

            // Translate
            console.log('Translating PDF content...');
            const translatedText = await translationService.translateText(fullText, targetLanguage);

            // Create new PDF with translated text
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(outputPath));
            
            doc.fontSize(12);
            doc.text(translatedText, {
                align: 'left',
                width: 500
            });
            
            doc.end();
            
            return new Promise((resolve, reject) => {
                doc.on('finish', () => {
                    console.log(`[PdfSurgery] Complete: ${outputPath}`);
                    resolve(outputPath);
                });
                doc.on('error', reject);
            });
        } catch (error) {
            console.error('[PdfSurgery] Error:', error);
            throw error;
        }
    }
}

module.exports = new PdfSurgery();
