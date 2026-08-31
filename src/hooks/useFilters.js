/**
 * useFilters Hook
 * 
 * What it does:
 * - Manages all filter states (state, city, qualification, course)
 * - Updates filters when user clicks charts
 * - Applies filters to data
 * - Handles "Clear Filters" button
 * 
 * How filtering works:
 * - User clicks a chart element
 * - Filter updates
 * - Data is re-filtered
 * - All components re-render with new data
 * - Dashboard updates instantly
 */

import { useState, useEffect } from 'react';
import { filterData } from '../utils/dataProcessor';

export const useFilters = (initialData) => {
  // All possible filters
  const [filters, setFilters] = useState({
    state: null,           // null = no filter, or state name
    city: null,            // null = no filter, or city name
    qualification: null,   // null = no filter, or qualification
    course: null,          // null = no filter, or course name
  });

  // The data after applying filters
  const [filteredData, setFilteredData] = useState(initialData);

  /**
   * Update a single filter
   * 
   * What it does:
   * - When user clicks a chart
   * - Toggle the filter on/off (click same item = turn off)
   * - Clear dependent filters (e.g., clear city when changing state)
   * 
   * Example:
   * - Click "Karnataka" state → state filter = "Karnataka"
   * - Click "Karnataka" again → state filter = null (off)
   */
  const updateFilter = (filterName, value) => {
    setFilters((prev) => {
      // Toggle: if same value, turn off (null), else set it
      const newValue = prev[filterName] === value ? null : value;
      
      // If changing state, clear city filter too
      if (filterName === 'state') {
        return {
          ...prev,
          state: newValue,
          city: null,  // Clear city when state changes
        };
      }
      
      return {
        ...prev,
        [filterName]: newValue,
      };
    });
  };

  /**
   * Clear All Filters
   * 
   * What it does:
   * - Sets all filters back to null
   * - Called when user clicks "Clear Filters" button
   */
  const clearFilters = () => {
    setFilters({
      state: null,
      city: null,
      qualification: null,
      course: null,
    });
  };

  /**
   * Apply Filters to Data
   * 
   * What it does:
   * - Takes original data
   * - Applies current filters
   * - Stores result in filteredData
   * - Called automatically when filters change
   */
  const applyFilters = () => {
    const filtered = filterData(initialData, filters);
    setFilteredData(filtered);
  };

  /**
   * Re-apply filters when filters or data change
   * 
   * This runs automatically:
   * - When user clicks a chart (filters change)
   * - When new data is uploaded (initialData changes)
   */
  useEffect(() => {
    applyFilters();
  }, [filters, initialData]);

  // Return everything that other components need
  return {
    filters,              // Current filter values
    filteredData,         // Data after applying filters
    updateFilter,         // Function to change a filter
    clearFilters,         // Function to clear all filters
  };
};