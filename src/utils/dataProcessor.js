/**
 * Data Processing Functions
 * 
 * These functions:
 * - Aggregate data for charts (count by category)
 * - Filter data based on user selections
 * - Extract unique values
 */

/**
 * Aggregate Data
 * 
 * What it does:
 * - Takes all data and a field name (like 'State' or 'Course')
 * - Counts how many records for each value
 * - Returns array sorted by count (highest first)
 * 
 * Example:
 * Input: data = [{State: 'Karnataka'}, {State: 'Karnataka'}, {State: 'Delhi'}]
 *        field = 'State'
 * Output: [{name: 'Karnataka', count: 2}, {name: 'Delhi', count: 1}]
 */
export const aggregateData = (data, field) => {
  const aggregated = {};

  // Loop through each record
  data.forEach((row) => {
    // Get the value (e.g., 'Karnataka')
    const value = row[field] || 'Unknown';
    
    // Count it (add 1 each time we see this value)
    aggregated[value] = (aggregated[value] || 0) + 1;
  });

  // Convert object to array of {name, count}
  return Object.entries(aggregated)
    .map(([key, value]) => ({ name: key, count: value }))
    // Sort by count - highest first
    .sort((a, b) => b.count - a.count);
};

/**
 * Filter Data
 * 
 * What it does:
 * - Takes all data and filter criteria
 * - Returns only records matching ALL filters
 * - Used for cross-filtering (click state -> filters all)
 * 
 * Example:
 * filters = {state: 'Karnataka', city: null, qualification: 'UG', course: null}
 * Returns only records where State='Karnataka' AND Qualification='UG'
 */
export const filterData = (data, filters) => {
  return data.filter((row) => {
    // If state filter is set, record must match
    if (filters.state && row['State'] !== filters.state) return false;
    
    // If city filter is set, record must match
    if (filters.city && row['city'] !== filters.city) return false;
    
    // If qualification filter is set, record must match
    if (filters.qualification && row['Qualification'] !== filters.qualification) return false;
    
    // If course filter is set, record must match
    if (filters.course && row['Course'] !== filters.course) return false;
    
    // If all filters passed, include this record
    return true;
  });
};

/**
 * Get Unique Values
 * 
 * What it does:
 * - Takes all data and a field name
 * - Returns array of unique values for that field
 * - Used to get all states, all cities, etc.
 * 
 * Example:
 * Input: data, field='State'
 * Output: ['Karnataka', 'Delhi', 'Maharashtra', ...]
 */
export const getUniqueValues = (data, field) => {
  return [...new Set(data.map((row) => row[field]))]
    .filter(Boolean); // Remove empty/null values
};