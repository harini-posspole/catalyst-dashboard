/**
 * Student Table Component
 * 
 * What it shows:
 * - Table of all student records
 * - 1000 records per page
 * - Previous/Next buttons for pagination
 * - Shows record counts
 * 
 * Props:
 * - data: Array of filtered student records
 */

import { useState } from 'react';
import { colors, spacing, fonts, shadows } from '../styles/theme';

// Records per page
const RECORDS_PER_PAGE = 1000;

// Columns to display
const columns = [
  'Team Name',
  "Candidate's Name",
  "Candidate's Email",
  "Candidate's Mobile",
  'State',
  'city',
  'User type',
  'Course',
  'Qualification',
  'Year of Graduation',
];


export const StudentTable = ({ data }) => {
  // Current page state (starts at page 1)
  const [currentPage, setCurrentPage] = useState(1);
  
  // Search query state - NEW!
  const [searchQuery, setSearchQuery] = useState('');
  // Calculate pagination
    // Filter data based on search query
  const searchedData = data.filter((row) => {
    // If no search query, return all data
    if (!searchQuery.trim()) return true;
    
    // Search across ALL columns
    return columns.some((col) => {
      const cellValue = String(row[col] || '').toLowerCase();
      return cellValue.includes(searchQuery.toLowerCase());
    });
  });

  // Calculate pagination (using searched data)
    const totalPages = Math.ceil(searchedData.length / RECORDS_PER_PAGE);
  const startIdx = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIdx = startIdx + RECORDS_PER_PAGE;
  const pageData = searchedData.slice(startIdx, endIdx);  // Use searchedData

  // Section styling
  const sectionStyle = {
    background: '#131326',                        // Dark background
    border: `1px solid ${colors.border}`,            // Gray border
    borderRadius: '16px',                            // Rounded corners
    padding: spacing.lg,                             // Padding inside
    marginTop: spacing.lg,                           // Space above
    boxShadow: shadows.md,                           // Shadow for depth
  };

  // Title styling
  const titleStyle = {
    fontSize: fonts.sizes.lg,                         // 16px
    fontWeight: 600,                                  // Bold
    color: '#ffffff',                                 // White
    marginBottom: spacing.md,                         // Space below
    display: 'flex',                                  // Flex layout
    alignItems: 'center',                            // Vertically centered
    gap: '8px',                                       // Space between items
  };

  // Accent bar before title
  const accentBarStyle = {
    width: '4px',                                     // Thin bar
    height: '18px',                                   // Tall
    background: `linear-gradient(180deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
    borderRadius: '2px',                              // Slightly rounded
  };

  // Header row styling
  const headerStyle = {
    display: 'flex',                                  // Flex layout
    justifyContent: 'flex-end',                      // Right aligned
    marginBottom: spacing.md,                         // Space below
    paddingBottom: spacing.md,                        // Padding below
    borderBottom: `1px solid ${colors.border}`,      // Border below
    flexWrap: 'wrap',                                 // Wrap on mobile
    gap: spacing.md,                                 // Space between items
  };

  // Record count styling
  const recordCountStyle = {
    fontSize: fonts.sizes.sm,                         // 13px
    color: colors.accent,                            // Cyan
  };
    // Search input styling - NEW!
  const searchInputStyle = {
    padding: '10px 15px',
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    background: '#0f1729',
    color: colors.text,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    width: '250px',
    transition: 'all 0.3s',
  };

  // Search input focus styling
  const handleSearchFocus = (e) => {
    e.currentTarget.style.borderColor = colors.accent;
    e.currentTarget.style.boxShadow = `0 0 10px rgba(0, 217, 255, 0.3)`;
  };

  const handleSearchBlur = (e) => {
    e.currentTarget.style.borderColor = colors.border;
    e.currentTarget.style.boxShadow = 'none';
  };

  // Table wrapper (scrollable)
  const tableWrapperStyle = {
    overflowX: 'auto',                               // Scroll horizontally
    maxHeight: '600px',                              // Max height
    overflowY: 'auto',                               // Scroll vertically
  };

  // Table styling
  const tableStyle = {
    width: '100%',                                    // Full width
    borderCollapse: 'collapse',                       // No space between cells
    fontSize: fonts.sizes.sm,                         // 13px
  };

  // Table header cell styling
    // Table header cell styling
  const thStyle = {
    padding: spacing.sm,                             // Padding
    textAlign: 'left',                               // Left aligned
    color: colors.accent,                            // Cyan text
    fontWeight: 600,                                 // Bold
    fontSize: '14px',                                // Increased from default
    borderBottom: `2px solid ${colors.accent}`,     // Cyan border
    whiteSpace: 'nowrap',                            // Don't wrap
    background: '#0f1729',                           // Dark background
    position: 'sticky',                              // Sticky when scrolling
    top: 0,                                          // Stick to top
    zIndex: 10,                                      // Layer above others
  };

  // Table data cell styling
    // Table data cell styling
  const tdStyle = {
    padding: spacing.sm,                             // Padding
    borderBottom: `1px solid ${colors.border}`,     // Gray border
    color: colors.text,                              // Light text
    fontSize: '14px',                                // Increased from default
  };

  // Pagination container styling
  const paginationStyle = {
    display: 'flex',                                  // Flex layout
    justifyContent: 'center',                         // Center items
    alignItems: 'center',                            // Vertically centered
    gap: spacing.md,                                 // Space between items
    marginTop: spacing.lg,                            // Space above
    paddingTop: spacing.md,                           // Padding above
    borderTop: `1px solid ${colors.border}`,         // Border above
    flexWrap: 'wrap',                                 // Wrap on mobile
  };

  // Button styling
  const buttonStyle = (disabled) => ({
    background: colors.border,                        // Gray background
    color: colors.text,                               // Light text
    border: `1px solid ${colors.border}`,            // Gray border
    padding: '8px 12px',                             // Padding
    borderRadius: '6px',                             // Rounded corners
    cursor: disabled ? 'not-allowed' : 'pointer',   // Change cursor
    transition: 'all 0.2s',                          // Smooth animation
    fontSize: fonts.sizes.xs,                         // Small font
    fontWeight: 600,                                  // Bold
    opacity: disabled ? 0.5 : 1,                     // Fade if disabled
  });

  // Pagination info styling
  const paginationInfoStyle = {
    color: colors.textMuted,                          // Muted text
    fontSize: fonts.sizes.sm,                         // 13px
  };

  return (
    <div style={sectionStyle}>
      {/* Title */}
      <div style={titleStyle}>
        <div style={accentBarStyle} />
        STUDENT DETAILS
      </div>

            {/* Record count and Search bar */}
      <div style={headerStyle}>
        {/* Search input - NEW! */}
        <input
          type="text"
          placeholder="🔍 Search any column..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);  // Reset to page 1 when searching
          }}
          style={searchInputStyle}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        
        <div style={recordCountStyle}>
          Total: {data.length.toLocaleString()} | Found: {searchedData.length.toLocaleString()} | Showing: {pageData.length.toLocaleString()}
        </div>
      </div>

      {/* Table */}
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          {/* Header row */}
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} style={thStyle}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {pageData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col} style={tdStyle}>
                    {row[col] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div style={paginationStyle}>
        {/* Previous button */}
        <button
          style={buttonStyle(currentPage === 1)}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        {/* Page info */}
        <span style={paginationInfoStyle}>
          Page {currentPage} of {totalPages}
        </span>

        {/* Next button */}
        <button
          style={buttonStyle(currentPage >= totalPages)}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage >= totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};