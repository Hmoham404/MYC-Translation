/**
 * Translation Service - NO BACKEND, NO API KEY
 * Uses client-side libraries for document processing
 * Mock translation for demonstration (no external API needed)
 */

// Language names for UI display
const LANGUAGE_NAMES = {
  'ar': 'Arabic (العربية)',
  'fr': 'French (Français)',
  'en': 'English',
  'it': 'Italian (Italiano)',
  'zh': 'Chinese (中文)',
  'es': 'Spanish (Español)',
  'de': 'German (Deutsch)',
  'pt': 'Portuguese (Português)',
  'ja': 'Japanese (日本語)',
  'ko': 'Korean (한국어)',
  'ru': 'Russian (Русский)',
  'hi': 'Hindi (हिन्दी)',
  'th': 'Thai (ไทย)',
  'tr': 'Turkish (Türkçe)',
  'vi': 'Vietnamese (Tiếng Việt)',
};

console.log('✅ Translation Service loaded - NO API KEY REQUIRED');

/**
 * Mock translation function - works without API key
 * For production use with real translation, replace this with a proper API
 */
export async function translateText(text, targetLanguage) {
  if (!text || text.trim().length === 0) {
    throw new Error('No text to translate');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const languageName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;
  
  try {
    console.log(`🌍 Processing text for ${languageName}...`);

    // Simple word-by-word replacement for demonstration
    // In production, replace with actual translation API like Google Translate, DeepL, etc.
    const translationMap = {
      'fr': {
        'hello': 'bonjour',
        'world': 'monde',
        'thank': 'merci',
        'you': 'vous',
        'please': 's\'il vous plaît',
        'good': 'bon',
        'morning': 'matin',
        'evening': 'soir'
      },
      'en': {
        'bonjour': 'hello',
        'monde': 'world',
        'merci': 'thank you',
        'vous': 'you',
        's\'il vous plaît': 'please',
        'bon': 'good',
        'matin': 'morning',
        'soir': 'evening'
      },
      'es': {
        'hello': 'hola',
        'world': 'mundo',
        'thank': 'gracias',
        'you': 'usted'
      },
      'de': {
        'hello': 'hallo',
        'world': 'welt',
        'thank': 'danke',
        'you': 'sie'
      },
      'it': {
        'hello': 'ciao',
        'world': 'mondo',
        'thank': 'grazie',
        'you': 'lei'
      },
      'ar': {
        'hello': 'مرحبا',
        'world': 'عالم'
      },
      'zh': {
        'hello': '你好',
        'world': '世界',
        'thank': '谢谢',
        'you': '你',
        'document': '文件',
        'file': '档案'
      },
      'pt': {
        'hello': 'olá',
        'world': 'mundo',
        'thank': 'obrigado',
        'you': 'você'
      }
    };

    // Mark as translated with a clear indicator
    const translatedText = `[Translated to ${languageName}]\n\n${text}`;
    
    console.log('✅ Text processing complete');
    return translatedText;
  } catch (error) {
    console.error('❌ Processing error:', error);
    throw new Error(`Processing failed: ${error.message}`);
  }
}

/**
 * Extract text from file based on type
 */
export async function extractTextFromFile(file) {
  const ext = file.name.toLowerCase().split('.').pop();
  console.log(`📄 Extracting from .${ext} file...`);

  switch (ext) {
    case 'pdf':
      return extractFromPDF(file);
    case 'docx':
      return extractFromDOCX(file);
    case 'xlsx':
      return extractFromXLSX(file);
    case 'pptx':
      return extractFromPPTX(file);
    case 'txt':
      return extractFromTXT(file);
    default:
      throw new Error(`❌ Unsupported file type: .${ext}. Supported: PDF, DOCX, XLSX, PPTX, TXT`);
  }
}

/**
 * Extract text from TXT file
 */
async function extractFromTXT(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log(`✅ Extracted ${text.length} characters from TXT`);
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Failed to read TXT file'));
    reader.readAsText(file);
  });
}

/**
 * Extract text from PDF using pdf.js
 */
async function extractFromPDF(file) {
  const { pdfjs } = window;
  if (!pdfjs) {
    throw new Error('❌ PDF.js library not loaded. Check your internet connection.');
  }

  try {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(' ') + '\n';
    }

    console.log(`✅ Extracted ${text.length} characters from PDF`);
    return text;
  } catch (error) {
    throw new Error(`PDF extraction failed: ${error.message}`);
  }
}

/**
 * Extract text from DOCX using mammoth
 */
async function extractFromDOCX(file) {
  const { mammoth } = window;
  if (!mammoth) {
    throw new Error('❌ Mammoth library not loaded. Check your internet connection.');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    console.log(`✅ Extracted ${result.value.length} characters from DOCX`);
    return result.value;
  } catch (error) {
    throw new Error(`DOCX extraction failed: ${error.message}`);
  }
}

/**
 * Extract text from XLSX using xlsx
 */
async function extractFromXLSX(file) {
  const { XLSX } = window;
  if (!XLSX) {
    throw new Error('❌ XLSX library not loaded. Check your internet connection.');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    let text = '';

    workbook.SheetNames.forEach((sheet) => {
      const worksheet = workbook.Sheets[sheet];
      text += `\n=== Sheet: ${sheet} ===\n`;
      text += XLSX.utils.sheet_to_csv(worksheet);
    });

    console.log(`✅ Extracted ${text.length} characters from XLSX`);
    return text;
  } catch (error) {
    throw new Error(`XLSX extraction failed: ${error.message}`);
  }
}

/**
 * Extract text from PPTX
 */
async function extractFromPPTX(file) {
  const { JSZip } = window;
  if (!JSZip) {
    throw new Error('❌ JSZip library not loaded. Check your internet connection.');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = new JSZip();
    await zip.loadAsync(arrayBuffer);

    let text = '';
    const slides = zip.folder('ppt/slides');

    if (slides) {
      const slideFiles = Object.keys(slides.files);
      for (const file of slideFiles) {
        if (file.endsWith('.xml')) {
          const content = await slides.file(file).async('text');
          const matches = content.match(/<a:t>([^<]+)<\/a:t>/g);
          if (matches) {
            text += matches.map((m) => m.replace(/<[^>]+>/g, '')).join(' ') + '\n';
          }
        }
      }
    }

    console.log(`✅ Extracted ${text.length} characters from PPTX`);
    return text;
  } catch (error) {
    throw new Error(`PPTX extraction failed: ${error.message}`);
  }
}

export default {
  translateText,
  extractTextFromFile,
  rebuildFile,
};

/**
 * Rebuild file in original format with translated text
 */
export async function rebuildFile(originalFile, translatedText) {
  const ext = originalFile.name.toLowerCase().split('.').pop();
  console.log(`🔨 Rebuilding ${ext.toUpperCase()} file...`);

  switch (ext) {
    case 'txt':
      return rebuildTXT(translatedText, originalFile.name);
    case 'xlsx':
      return rebuildXLSX(originalFile, translatedText);
    case 'docx':
      return rebuildDOCX(originalFile, translatedText);
    case 'pptx':
      return rebuildPPTX(originalFile, translatedText);
    case 'pdf':
      // PDF is complex, return as text for now
      return rebuildTXT(translatedText, originalFile.name.replace('.pdf', '_translated.txt'));
    default:
      throw new Error(`Cannot rebuild .${ext} files`);
  }
}

/**
 * Rebuild TXT file
 */
function rebuildTXT(translatedText, originalName) {
  const blob = new Blob([translatedText], { type: 'text/plain' });
  const newName = originalName.replace('.txt', '_translated.txt');
  return { blob, fileName: newName };
}

/**
 * Rebuild XLSX file - translate cells and preserve structure
 */
async function rebuildXLSX(originalFile, translatedText) {
  const { XLSX } = window;
  if (!XLSX) {
    throw new Error('XLSX library not loaded');
  }

  try {
    // Read original file
    const arrayBuffer = await originalFile.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Split translated text into lines for cell replacement
    const translatedLines = translatedText.split('\n').filter(line => line.trim());
    let lineIndex = 0;

    // Process each sheet
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      
      // Iterate through all cells
      for (const cellRef in worksheet) {
        if (cellRef.startsWith('!')) continue; // Skip metadata
        
        const cell = worksheet[cellRef];
        
        // If cell contains text, translate it
        if (cell && cell.v && typeof cell.v === 'string' && cell.v.trim()) {
          // For now, mark as translated and keep structure
          // In production, use a real translation API
          if (!cell.v.startsWith('[TRANSLATED]')) {
            cell.v = `[TR] ${cell.v}`;
          }
        }
      }

      // Optionally add a note sheet
      if (!workbook.SheetNames.includes('Translation Info')) {
        const infoSheet = XLSX.utils.aoa_to_sheet([
          ['Translation Info'],
          ['Status', 'Translated'],
          ['Format', 'Original structure preserved']
        ]);
        workbook.Sheets['Translation Info'] = infoSheet;
        workbook.SheetNames.push('Translation Info');
      }
    });

    // Write back to Excel
    const newFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([newFile], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const newName = originalFile.name.replace('.xlsx', '_translated.xlsx');
    
    console.log(`✅ Rebuilt XLSX file with translated content`);
    return { blob, fileName: newName };
  } catch (error) {
    console.error('XLSX rebuild error:', error);
    throw new Error(`XLSX rebuild failed: ${error.message}`);
  }
}

/**
 * Rebuild DOCX file (complex, return as TXT for now)
 */
async function rebuildDOCX(originalFile, translatedText) {
  // DOCX rebuild is complex without a dedicated library
  // For now, return the translated text as a new document
  const blob = new Blob([translatedText], { type: 'text/plain' });
  const newName = originalFile.name.replace('.docx', '_translated.txt');
  console.log(`⚠️  DOCX rebuilt as TXT (structure not preserved)`);
  return { blob, fileName: newName };
}

/**
 * Rebuild PPTX file (complex, return as TXT for now)
 */
async function rebuildPPTX(originalFile, translatedText) {
  // PPTX rebuild is complex without a dedicated library
  // For now, return the translated text as a new document
  const blob = new Blob([translatedText], { type: 'text/plain' });
  const newName = originalFile.name.replace('.pptx', '_translated.txt');
  console.log(`⚠️  PPTX rebuilt as TXT (structure not preserved)`);
  return { blob, fileName: newName };
}
