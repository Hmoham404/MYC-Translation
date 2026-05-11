const fs = require('fs');
const JSZip = require('jszip');
const translationService = require('./translationService');

class WordSurgery {
    xmlEscape(str) {
        if (!str) return "";
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    xmlUnescape(str) {
        if (!str) return "";
        return str.toString()
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    }

    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    async process(inputPath, outputPath, targetLanguage) {
        console.log(`[WordSurgery] Processing: ${inputPath}`);
        const fileBuffer = fs.readFileSync(inputPath);
        const zip = new JSZip();
        await zip.loadAsync(fileBuffer);

        // Find document.xml
        const documentXml = await zip.file('word/document.xml').async('string');
        
        // Extract all text elements
        const textMap = new Map();
        const regex = /<w:t[^>]*>(.*?)<\/w:t>/g;
        let match;

        while ((match = regex.exec(documentXml)) !== null) {
            const escapedText = match[1];
            if (escapedText && escapedText.trim().length > 0) {
                textMap.set(escapedText, this.xmlUnescape(escapedText));
            }
        }

        if (textMap.size > 0) {
            // Translate all texts
            const unescapedTexts = [...textMap.values()];
            console.log(`Translating ${unescapedTexts.length} text elements...`);
            const translatedMap = await translationService.translateBatch(unescapedTexts, targetLanguage);

            // Replace in document
            let newDocumentXml = documentXml;
            for (const [escapedText, unescaped] of textMap.entries()) {
                const translated = translatedMap[unescaped];
                if (translated) {
                    const oldTag = `<w:t>${escapedText}</w:t>`;
                    const newTag = `<w:t>${this.xmlEscape(translated)}</w:t>`;
                    // Use string.replace with escaped regex to avoid regex interpretation
                    newDocumentXml = newDocumentXml.split(oldTag).join(newTag);
                }
            }

            zip.file('word/document.xml', newDocumentXml);
        }

        const outputBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
        fs.writeFileSync(outputPath, outputBuffer);
        console.log(`[WordSurgery] Complete: ${outputPath}`);
        return outputPath;
    }
}

module.exports = new WordSurgery();
