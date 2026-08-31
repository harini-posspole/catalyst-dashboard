/**
 * Header Component
 * 
 * What it shows:
 * - "CATALYST PROGRAM" title at top
 * - Upload CSV/Excel button
 * - Status badge (showing loading/success/error)
 * - Clear Filters button
 * 
 * Props (inputs from parent):
 * - onFileSelect: function called when user picks file
 * - status: text to show in status badge
 * - statusType: 'info', 'success', or 'error' (for color)
 * - onClearFilters: function called when Clear button clicked
 * - isFiltering: true if any filters active (enables/disables button)
 * - loading: true if file is being loaded
 */

import { colors, spacing, fonts } from '../styles/theme';

export const Header = ({
  onFileSelect,
  status,
  statusType = 'info',
  onClearFilters,
  isFiltering,
  loading,
  dataLoaded,              // ✅ NEW!
  onGoBack,                // ✅ NEW!
}) => {
  // Styling for the entire header section
  const headerStyle = {
    display: 'flex',                    // Side-by-side layout
    justifyContent: 'space-between',   // Title on left, buttons on right
    alignItems: 'center',              // Vertically centered
    marginBottom: spacing.xl,          // Space below header
    flexWrap: 'wrap',                  // Wrap on mobile
    gap: spacing.md,                   // Space between items
  };

  // Title styling
  const titleStyle = {
    fontSize: fonts.sizes.xxxl,        // 40px - big!
    fontWeight: 700,                   // Bold
    color: '#ffffff',                  // White
    margin: 0,                         // No default margins
    letterSpacing: '0.5px',            // Slight space between letters
    textTransform: 'uppercase',        // ALL CAPS
  };// Logo styling
const logoStyle = {
  height: '50px',                     // Logo height
  width: 'auto',                      // Auto width to maintain aspect ratio
  marginRight: spacing.lg,            // Space to the right
  cursor: 'pointer',                  // Hand cursor on hover
  opacity: 0.9,                       // Slightly transparent
  transition: 'all 0.3s',   
  borderRadius: '8px',                    // ✅ ADD THIS (rounded corners)
  border: '1px solid #e5e7eb',           // Smooth animation on hover
};
  // Container for buttons on right
  const actionsStyle = {
    display: 'flex',                   // Buttons in row
    gap: spacing.md,                   // Space between buttons
    alignItems: 'center',              // Vertically aligned
    flexWrap: 'wrap',                  // Wrap on mobile
  };

  // Upload button styling
  const uploadButtonStyle = {
    background: 'linear-gradient(135deg, #00D9FF 0%, #00BCD4 100%)',  // Cyan gradient
    color: colors.background,          // Dark text
    border: 'none',                    // No border
    padding: '10px 20px',              // Padding inside button
    borderRadius: '8px',               // Rounded corners
    cursor: 'pointer',                 // Hand cursor on hover
    fontWeight: 600,                   // Bold text
    fontSize: fonts.sizes.sm,          // Small font
    transition: 'all 0.3s',            // Smooth animation
  };

  // Status badge styling
  const badgeStyle = {
    background: colors.cardBg,         // Dark background
    color: colors.accent,              // Cyan text
    padding: '8px 14px',               // Padding
    borderRadius: '20px',              // Very rounded (pill shape)
    fontSize: fonts.sizes.xs,          // Tiny font
    fontWeight: 600,                   // Bold
    border: `1px solid ${colors.accent}`,  // Cyan border
    minWidth: '150px',                 // Minimum width
    textAlign: 'center',               // Center text
  };

  // Different colors for different status types
  const badgeTypeStyle = {
    info: {
      ...badgeStyle,
      background: colors.cardBg,
      color: colors.accent,
      borderColor: colors.accent,
    },
    success: {
      ...badgeStyle,
      background: '#1a3a2a',           // Dark green
      color: colors.success,           // Green text
      borderColor: colors.success,
    },
    error: {
      ...badgeStyle,
      background: '#3a1a1a',           // Dark red
      color: colors.error,             // Red text
      borderColor: colors.error,
    },
  };

  // Clear Filters button styling
  const clearButtonStyle = {
    ...uploadButtonStyle,
    background: 'linear-gradient(135deg, #df1b2b 0%, #df1b2b 100%)',  // Red gradient
    color: '#f7f7f7',                    // White text
    opacity: isFiltering ? 1 : 0.5,    // Faded if no filters active
    cursor: isFiltering ? 'pointer' : 'not-allowed',  // Change cursor
  };

  // Input file element (hidden)
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

    return (
    <header style={headerStyle}>
      {/* Left side: Title */}
      <div>
        <h1 style={titleStyle}>CATALYST PROGRAM-Dashboard</h1>
      </div>


      {/* Right side: Buttons and status */}
      <div style={actionsStyle}>
        {/* Hidden file input */}
        <input
          id="fileInput"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          disabled={loading}
        />

                {/* Upload button - only show if no data loaded */}
                {/* CONDITIONAL BUTTON - Shows Upload or Go Back */}
        {!dataLoaded ? (
          // Show UPLOAD button before data loads
          <button
            style={uploadButtonStyle}
            onClick={() => document.getElementById('fileInput').click()}
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '📁 Upload CSV/Excel'}
          </button>
        ) : (
          // Show GO BACK button after data loads
          <button
            style={{
              ...uploadButtonStyle,
              background: 'linear-gradient(135deg, #03e6f6 0%, #03e6f6 100%)',
            }}
            onClick={onGoBack}
          >
            ← Go Back
          </button>
        )}

        {/* Status badge */}
        <div style={badgeTypeStyle[statusType]}>
          {status}
        </div>

        {/* Clear Filters button */}
        <button
          style={clearButtonStyle}
          onClick={onClearFilters}
          disabled={!isFiltering}
        >
          Clear Filters
        </button>
        {/* Logo in top right - NEW! */}
      <img 
        src="/images/posspole-logo.png" 
        alt="Posspole Catalyst Logo"
        style={logoStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      </div>
    </header>
  );
};