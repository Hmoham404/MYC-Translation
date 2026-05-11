#!/usr/bin/env node

/**
 * Script to generate a test XLSX file
 * Run: node generate-test-excel.js
 */

const XLSX = require('xlsx');
const path = require('path');

// Sample data
const data = [
  ['Nom', 'Prénom', 'Titre', 'Email'],
  ['LAKHAL', 'Mohamed', 'Ingénieur Système', 'lakhal@example.com'],
  ['DUPONT', 'Jean', 'Développeur Web', 'jean@example.com'],
  ['MARTIN', 'Marie', 'Conceptrice UX/UI', 'marie@example.com'],
  ['BERNARD', 'Pierre', 'Data Scientist', 'pierre@example.com'],
];

// Create workbook and worksheet
const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Employees');

// Set column widths
ws['!cols'] = [
  { wch: 15 },
  { wch: 15 },
  { wch: 20 },
  { wch: 25 }
];

// Write file
const filename = path.join(__dirname, 'test-employees.xlsx');
XLSX.writeFile(wb, filename);

console.log(`✅ Test file created: ${filename}`);
console.log('📤 Upload this file in the app and translate it!');
