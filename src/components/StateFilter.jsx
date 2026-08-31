/**
 * State Filter Dropdown Component
 * 
 * What it does:
 * - Shows dropdown with ALL states from data
 * - Allows user to filter by state
 * - Works with existing state filter
 */

import { colors, spacing, fonts } from '../styles/theme';

export const StateFilter = ({ data, selectedState, onStateSelect }) => {
  // Get all unique states from data
  const allStates = [...new Set(data.map(row => row['State']))].sort();

  // Container styling
  const containerStyle = {
    marginBottom: spacing.lg,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  };

  // Label styling
  const labelStyle = {
    fontSize: fonts.sizes.sm,
    fontWeight: 600,
    color: '#ffffff',
    minWidth: '100px',
  };

  // Select dropdown styling
  const selectStyle = {
    padding: '10px 15px',
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    background: colors.cardBg,
    color: colors.text,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    cursor: 'pointer',
    minWidth: '200px',
    transition: 'all 0.3s',
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>Filter by State:</label>
      <select
        value={selectedState || ''}
        onChange={(e) => {
          const value = e.target.value;
          onStateSelect(value || null);  // Pass null if empty
        }}
        style={selectStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.border;
        }}
      >
        <option value="">-- All States --</option>
        {allStates.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};