// This file reads CSV files using Papa Parse library
import Papa from 'papaparse';

/**
 * Parse CSV File
 * 
 * What it does:
 * - Takes a CSV file (like catalyst_data.csv)
 * - Converts it into JavaScript data (array of objects)
 * - Returns the data or an error
 * 
 * How it works:
 * - Papa.parse() reads the file
 * - header: true means first row becomes column names
 * - skipEmptyLines: true ignores empty rows
 */
export const parseCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,                    // First row is header (column names)
      skipEmptyLines: true,            // Ignore blank rows
      complete: (results) => {
        // When parsing is done
        if (results.data && results.data.length > 0) {
          // Success - return the data
          resolve(results.data);
        } else {
          // No data found
          reject(new Error('No data found in CSV'));
        }
      },
      error: (error) => {
        // If something went wrong
        reject(new Error(`CSV Parse Error: ${error.message}`));
      },
    });
  });
};