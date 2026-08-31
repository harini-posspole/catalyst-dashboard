/**
 * Course Chart Component
 * 
 * What it shows:
 * - Horizontal bars for each course
 * - ALL courses (scrollable list)
 * - Bar width shows count (longer = more students)
 * - Each bar is clickable
 * - Click bar → filters by that course
 * 
 * Props:
 * - data: The data to display
 * - onSelect: Function called when user clicks a bar
 * - selectedCourse: Current selected course (for highlighting)
 */

import { colors, spacing, fonts } from '../styles/theme';
import { aggregateData } from '../utils/dataProcessor';

export const CourseChart = ({ data, onSelect, selectedCourse }) => {
  // Get all courses and their counts, sorted by count
  const courses = aggregateData(data, 'Course');
  
  // Find the highest count (for scaling bar widths)
  const max = courses[0]?.count || 1;

  // Container styling - scrollable column
  const containerStyle = {
    display: 'flex',                                    // Flex layout
    flexDirection: 'column',                           // Stack vertically
    gap: spacing.sm,                                  // Space between rows
    maxHeight: '600px',                               // Max height
    overflowY: 'auto',                                // Scroll vertically
    paddingRight: '0.5rem',                           // Padding for scrollbar
    width: '100%',                                    // Full width
  };

  // Scrollbar styling (webkit browsers)
  const scrollbarStyle = `
    ${containerStyle.overflowY === 'auto' ? `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: ${colors.background};
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, ${colors.accent} 0%, ${colors.accentDark} 100%);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #00FFFF 0%, ${colors.accent} 100%);
      }
    ` : ''
  }`;

  // Individual bar row styling
  const barRowStyle = (isSelected) => ({
    display: 'flex',                                  // Side by side layout
    alignItems: 'center',                            // Vertically centered
    gap: spacing.md,                                 // Space between label and bar
    cursor: 'pointer',                               // Hand cursor
    padding: spacing.sm,                             // Padding
    borderRadius: '8px',                             // Rounded corners
    transition: 'all 0.2s',                          // Smooth animation
    background: isSelected ? 'rgba(0, 217, 255, 0.15)' : 'transparent',  // Highlight if selected
  });

  // Course label styling
    // Course label styling
  const labelStyle = {
    fontSize: '14px',                                 // Increased from 12px
    color: colors.text,                               // Light text                             // Light text
    minWidth: '150px',                                // Minimum width
    whiteSpace: 'nowrap',                             // Don't wrap text
    overflow: 'hidden',                               // Hide overflow
    textOverflow: 'ellipsis',                         // Show ... for overflow
    fontWeight: 500,                                  // Medium weight
  };

  // Bar container (background track)
  const barContainerStyle = {
    flex: 1,                                          // Take remaining space
    height: '20px',                                   // Height of bar
    background: '#0f1729',                            // Dark background
    borderRadius: '4px',                              // Rounded corners
    overflow: 'hidden',                               // Hide overflow
  };

  // Bar fill styling - function because width changes
  const barFillStyle = (width) => ({
    height: '100%',                                   // Full height
    background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`,  // Cyan gradient
    borderRadius: '4px',                              // Rounded corners
    width: `${width}%`,                               // Dynamic width based on count
    transition: 'all 0.2s',                           // Smooth animation
  });

  // Count value styling (on right)
    // Count value styling (on right)
  const valueStyle = {
    fontSize: '14px',                                 // Increased from 12px
    color: colors.text,                               // Light text                              // Light text
    minWidth: '45px',                                 // Minimum width
    textAlign: 'right',                               // Right aligned
    fontWeight: 600,                                  // Bold
  };

  return (
    <div style={containerStyle}>
      {/* Loop through each course */}
      {courses.map((course, idx) => {
        // Calculate bar width as percentage of max
        const width = (course.count / max) * 100;
        
        // Check if this bar is selected
        const isSelected = selectedCourse === course.name;

        return (
          <div
            key={course.name}
            style={barRowStyle(isSelected)}
            onClick={() => onSelect(course.name)}  // Click to filter
            onMouseEnter={(e) => {
              // Hover - highlight background
              e.currentTarget.style.background = 'rgba(0, 217, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              // Hover off - reset
              e.currentTarget.style.background = isSelected ? 'rgba(0, 217, 255, 0.15)' : 'transparent';
            }}
          >
            {/* Course name label */}
            <div style={labelStyle} title={course.name}>
              {course.name.substring(0, 35)}  {/* Truncate long names */}
            </div>

            {/* Bar background and fill */}
            <div style={barContainerStyle}>
              <div style={barFillStyle(width)} />
            </div>

            {/* Count value */}
            <div style={valueStyle}>
              {course.count.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};