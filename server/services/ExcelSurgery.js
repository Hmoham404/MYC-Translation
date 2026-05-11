const ExcelJS = require('exceljs');
const translationService = require('./translationService');

class ExcelSurgery {
    async process(inputPath, outputPath, targetLanguage) {
        console.log(`[ExcelSurgery] Processing: ${inputPath}`);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(inputPath);

        const translateCell = async (cell) => {
            // Only translate String values, preserve all formatting/styles
            if (cell.type === ExcelJS.ValueType.String && cell.value && cell.value.trim().length > 0) {
                try {
                    const translated = await translationService.translateText(cell.value, targetLanguage);
                    cell.value = translated;
                } catch (err) {
                    console.error(`[ExcelSurgery] Error translating cell: ${cell.value}`);
                }
            }
        };

        const tasks = [];
        workbook.eachSheet(sheet => {
            sheet.eachRow(row => {
                row.eachCell({ includeEmpty: false }, cell => {
                    // Only translate text cells
                    if (cell.type === ExcelJS.ValueType.String) {
                        tasks.push(translateCell(cell));
                    }
                });
            });
        });

        // Execute all translations
        await Promise.all(tasks);

        // Write back to file with all formatting preserved
        await workbook.xlsx.writeFile(outputPath);
        console.log(`[ExcelSurgery] Complete: ${outputPath}`);
        return outputPath;
    }
}

module.exports = new ExcelSurgery();
