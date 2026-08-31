/**
 * useFileUpload Hook
 * 
 * What it does:
 * - Handles file upload (CSV or Excel)
 * - Parses the file using our parsers
 * - Manages loading and error states
 * - Returns data to parent component
 * 
 * Why a Hook?
 * - Keeps upload logic separate
 * - Reusable across components
 * - Manages its own state
 */

import { useState } from 'react';
import { parseCSVFile } from '../utils/csvParser';
import { parseExcelFile } from '../utils/excelParser';

export const useFileUpload = () => {
  // State variables (remember these values)
  const [data, setData] = useState([]);           // The parsed data
  const [loading, setLoading] = useState(false);  // Are we loading?
  const [error, setError] = useState(null);       // Any errors?

  /**
   * Handle File Upload
   * 
   * What it does:
   * 1. Takes a file from user
   * 2. Checks if it's CSV or Excel
   * 3. Calls the right parser
   * 4. Stores data
   * 5. Handles errors
   */
  const handleFileUpload = async (file) => {
    // If no file, exit
    if (!file) return;

    // Start loading
    setLoading(true);
    setError(null);

    try {
      let parsedData;

      // Check file type by extension
      if (file.name.endsWith('.csv')) {
        // It's a CSV file - use CSV parser
        parsedData = await parseCSVFile(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        // It's an Excel file - use Excel parser
        parsedData = await parseExcelFile(file);
      } else {
        // Unknown file type
        throw new Error('Only CSV and Excel files are supported');
      }

      // Success - store the data
      setData(parsedData);
      console.log(`✅ Loaded ${parsedData.length} records`);
    } catch (err) {
      // Something went wrong - store error message
      setError(err.message);
      console.error('Upload Error:', err);
    } finally {
      // Done loading (whether success or error)
      setLoading(false);
    }
  };

  // Return what we have (other components use these)
  return { data, loading, error, handleFileUpload };
};