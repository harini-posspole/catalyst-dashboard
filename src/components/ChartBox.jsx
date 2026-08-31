/**
 * ChartBox Component
 * 
 * What it does:
 * - Creates a styled container/box
 * - Holds charts, KPI cards, tables
 * - Adds title and styling
 * - Makes everything look consistent
 * 
 * Props:
 * - title: Optional title for the box
 * - children: Whatever content goes inside
 * - minHeight: Optional minimum height
 */

import { colors, spacing, fonts, shadows } from '../styles/theme';

export const ChartBox = ({ title, children, minHeight = '400px' }) => {
  // Styling for the box container
  const containerStyle = {
    background: '#131326', // Dark background
    border: `1px solid ${colors.border}`,  // Gray border
    borderRadius: '16px',              // Rounded corners
    padding: spacing.lg,               // Inside padding
    boxShadow: shadows.md,             // Shadow for depth
    transition: 'all 0.3s ease',       // Smooth animation
    cursor: 'pointer',                 // Hand cursor
    minHeight: minHeight,              // Minimum height
    display: 'flex',                   // Flex layout
    flexDirection: 'column',           // Stack items vertically
  };

  // Hover effect styling
  const handleMouseEnter = (e) => {
    e.currentTarget.style.borderColor = colors.accent;
    e.currentTarget.style.boxShadow = shadows.lg;
    e.currentTarget.style.transform = 'translateY(-2px)';  // Lift up slightly
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.borderColor = colors.border;
    e.currentTarget.style.boxShadow = shadows.md;
    e.currentTarget.style.transform = 'translateY(0)';
  };

  // Title styling
  const titleStyle = {
    fontSize: fonts.sizes.lg,          // 16px
    fontWeight: 600,                   // Bold
    color: '#ffffff',                  // White
    marginBottom: spacing.md,          // Space below title
    display: 'flex',                   // Flex layout
    alignItems: 'center',              // Vertically align
    gap: '8px',                        // Space between items
  };

  // The cyan accent bar before title
  const accentBarStyle = {
    width: '4px',                      // Thin bar
    height: '18px',                    // Tall bar
    background: `linear-gradient(180deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,  // Cyan gradient
    borderRadius: '2px',               // Slightly rounded
  };

  // Content area (flex grows to fill space)
  const contentStyle = {
    flex: 1,                           // Take remaining space
    display: 'flex',                   // Flex layout
    alignItems: 'center',              // Center content
    justifyContent: 'center',          // Center content
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title with accent bar (if title provided) */}
      {title && (
        <div style={titleStyle}>
          <div style={accentBarStyle} />
          {title.toUpperCase()}  {/* Convert to ALL CAPS */}
        </div>
      )}

      {/* Content goes here (charts, cards, etc.) */}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};