/**
 * KPI Cards Component
 * 
 * What it shows:
 * - Cards for each qualification type
 * - Count of students
 * - Percentage of total
 * - Each card is clickable
 * - Click card → filters by that qualification
 * 
 * Props:
 * - data: The data to display
 * - onSelect: Function called when user clicks a card
 * - selectedQualification: Current selected qualification (for highlighting)
 */

import { colors, spacing, fonts } from '../styles/theme';
import { aggregateData } from '../utils/dataProcessor';

export const KPICards = ({ data, onSelect, selectedQualification }) => {
  // Get all qualification types and their counts, sorted by count
  const qualifications = aggregateData(data, 'Qualification');
  const total = data.length || 1;  // Total records (avoid divide by zero)

  // Container styling - grid layout
  const gridStyle = {
    display: 'grid',                                    // Grid layout
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',  // Auto-fit columns
    gap: spacing.md,                                   // Space between cards
    width: '100%',                                     // Full width
  };

  // Individual card styling - function because styling changes when selected
  const cardStyle = (isSelected) => ({
    background: isSelected ? '#ffffff' : '#f5f7fa',   // White if selected, light gray otherwise
    border: `1px solid ${isSelected ? colors.accent : '#e5e7eb'}`,  // Cyan border if selected
    borderRadius: '12px',                             // Rounded corners
    padding: `${spacing.md} ${spacing.sm}`,          // Padding inside
    textAlign: 'center',                              // Center text
    transition: 'all 0.3s ease',                     // Smooth animation
    cursor: 'pointer',                                // Hand cursor
    display: 'flex',                                  // Flex layout
    flexDirection: 'column',                          // Stack items vertically
    justifyContent: 'center',                         // Center vertically
    alignItems: 'center',                             // Center horizontally
    minHeight: '160px',                               // Minimum height
    boxShadow: isSelected ? `0 8px 24px rgba(0, 217, 255, 0.25)` : 'none',  // Shadow if selected
  });

  // Label styling (e.g., "Undergraduate")
    // Label styling (e.g., "Undergraduate")
  const labelStyle = {
    fontSize: '14px',                                 // Increased from 12px
    color: '#1e1e23',                                 // Darker grey (was #64748b)
    fontWeight: 600,                                  // Bold
    marginBottom: spacing.xs,                         // Space below
    textTransform: 'uppercase',                       // ALL CAPS
    letterSpacing: '0.5px',                          // Slight letter spacing
  };

  // Big number styling (count)
  const valueStyle = {
    fontSize: '36px',                                 // Large number
    fontWeight: 700,                                  // Very bold
    color: colors.accent,                            // Cyan color
    marginBottom: spacing.xs,                         // Space below
    lineHeight: 1,                                    // No line height
  };

  // Percentage styling
    // Percentage styling
  const percentStyle = {
    fontSize: '15px',                                 // Increased from 13px
    color: '#1e1e23',                                 // Darker grey (was #94a3b8)
    fontWeight: 600,                                  // Bold
  };

  return (
    <div style={gridStyle}>
      {/* Loop through each qualification */}
      {qualifications.map((qual) => {
        // Calculate percentage
        const percent = ((qual.count / total) * 100).toFixed(1);
        
        // Check if this card is selected
        const isSelected = selectedQualification === qual.name;

        return (
          <div
            key={qual.name}
            style={cardStyle(isSelected)}
            onClick={() => onSelect(qual.name)}  // Click card to filter
            onMouseEnter={(e) => {
              // Hover effect - lift card up
              if (!isSelected) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 217, 255, 0.15)`;
              }
            }}
            onMouseLeave={(e) => {
              // Hover off - reset
              if (!isSelected) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {/* Label */}
            <div style={labelStyle}>{qual.name}</div>
            
            {/* Count */}
            <div style={valueStyle}>{qual.count.toLocaleString()}</div>
            
            {/* Percentage */}
            <div style={percentStyle}>{percent}%</div>
          </div>
        );
      })}
    </div>
  );
};
