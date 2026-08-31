// This file reads Excel files using xlsx (SheetJS) library
import * as XLSX from 'xlsx';

/**
 * Parse Excel File
 * 
 * What it does:
 * - Takes an Excel file (.xlsx or .xls)
 * - Converts it into JavaScript data (array of objects)
 * - Returns the data from first sheet or an error
 * 
 * How it works:
 * - FileReader reads the file as binary
 * - XLSX.read() converts binary to workbook
 * - Gets first sheet and converts to JSON
 */
export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        // Get the file data
        const data = event.target.result;
        
        // Read it as an Excel workbook
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];
        
        // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert sheet to JSON (array of objects)
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Check if we have data
        if (jsonData && jsonData.length > 0) {
          // Success - return the data
          resolve(jsonData);
        } else {
          // No data found
          reject(new Error('No data found in Excel'));
        }
      } catch (error) {
        // If something went wrong
        reject(new Error(`Excel Parse Error: ${error.message}`));
      }
    };

    reader.onerror = () => {
      // If file reading failed
      reject(new Error('Failed to read file'));
    };

    // Read file as binary string
    reader.readAsBinaryString(file);
  });
};