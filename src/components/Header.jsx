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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    flexWrap: 'nowrap',               // ✅ Don't wrap
    gap: spacing.md,
    minWidth: '0',                    // ✅ Prevent overflow
  };

  // Title styling
    const titleStyle = {
    fontSize: '32px',                 // ✅ Smaller (was 40px)
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',             // ✅ Don't wrap
  };
  // Logo styling
const logoStyle = {
  height: '40px',                     // ✅ Smaller
  width: 'auto',
  marginRight: spacing.md,            // ✅ Less margin
  cursor: 'pointer',
  opacity: 0.9,
  transition: 'all 0.3s',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};
    // Container for buttons on right
  const actionsStyle = {
    display: 'flex',
    gap: spacing.md,
    alignItems: 'center',
    flexWrap: 'nowrap',               // ✅ Don't wrap
    minWidth: '0',                     // ✅ Prevent flex overflow
    overflow: 'hidden',                // ✅ Hide overflow
  };

  // Upload button styling
    // Upload button styling
  const uploadButtonStyle = {
    background: 'linear-gradient(135deg, #00D9FF 0%, #00BCD4 100%)',
    color: colors.background,
    border: 'none',
    padding: '8px 16px',               // ✅ Smaller padding
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '13px',                  // ✅ Smaller font
    transition: 'all 0.3s',
    whiteSpace: 'nowrap',              // ✅ Don't wrap text
  };

  // Status badge styling
   // Status badge styling
  const badgeStyle = {
    background: colors.cardBg,
    color: colors.accent,
    padding: '6px 12px',              // ✅ Smaller padding
    borderRadius: '20px',
    fontSize: '11px',                 // ✅ Smaller font
    fontWeight: 600,
    border: `1px solid ${colors.accent}`,
    minWidth: 'auto',                 // ✅ Auto width
    textAlign: 'center',
    whiteSpace: 'nowrap',             // ✅ Don't wrap
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
    background: 'linear-gradient(135deg, #df1b2b 0%, #df1b2b 100%)',
    color: '#f7f7f7',
    opacity: isFiltering ? 1 : 0.5,
    cursor: isFiltering ? 'pointer' : 'not-allowed',
    whiteSpace: 'nowrap',             // ✅ Add this
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