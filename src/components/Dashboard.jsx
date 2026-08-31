/**
 * Dashboard Component - MAIN COMPONENT
 * 
 * What it does:
 * - Combines all smaller components
 * - Manages file upload
 * - Manages filtering
 * - Controls all data flow
 * - Shows complete dashboard layout
 * 
 * Component Tree:
 * Dashboard
 * ├── Header
 * ├── StateChart + CityChart (Row 1)
 * ├── KPICards (Row 2)
 * ├── CourseChart (Row 3)
 * └── StudentTable
 */

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; 
import { colors, spacing, fonts } from '../styles/theme';
import { useFileUpload } from '../hooks/useFileUpload';
import { useFilters } from '../hooks/useFilters';
import { aggregateData } from '../utils/dataProcessor';
import { Header } from './Header';
import { ChartBox } from './ChartBox';
import { StateChart } from './StateChart';
import { CityChart } from './CityChart';
import { KPICards } from './KPICards';
import { CourseChart } from './CourseChart';
import { StudentTable } from './StudentTable';
import { StateFilter } from './StateFilter';

export const Dashboard = () => {
  // ==================== HOOKS ====================
  
  // Handle file upload (returns data, loading, error, handleFileUpload)
  const { data, loading, error, handleFileUpload } = useFileUpload();
  
  // Handle filtering (returns filters, filteredData, updateFilter, clearFilters)
  const {
    filters,
    filteredData,
    updateFilter,
    clearFilters: clearAllFilters,
  } = useFilters(data);

  // ==================== LOCAL STATE ====================
  
  // Status message at top
  const [status, setStatus] = useState('Not Loaded');
  
  // Status type (for coloring): 'info', 'success', 'error'
  const [statusType, setStatusType] = useState('info');

  // Track if data is loaded
  const dataLoaded = data.length > 0;

  // Go back handler - takes user back to welcome screen
  const handleGoBack = () => {
    window.location.reload();  // Simple reload to reset everything
  };

  // ==================== EFFECTS ====================
  
  // Update status when loading/error/data changes
  useEffect(() => {
    if (loading) {
      setStatus('⏳ Loading...');
      setStatusType('info');
    } else if (error) {
      setStatus(`❌ Error: ${error}`);
      setStatusType('error');
    } else if (data.length > 0) {
      setStatus(`✓ ${data.length.toLocaleString()} records loaded`);
      setStatusType('success');
    }
  }, [loading, error, data]);

  // ==================== EVENT HANDLERS ====================
  
    // When user selects a file
  const handleFileChange = (file) => {
    if (!file) return;
    handleFileUpload(file);
  };

  // ✅ NEW! Export filtered data to Excel
    const handleExportToExcel = () => {
    if (filteredData.length === 0) {
      alert('No data to export!');
      return;
    }

    // Use XLSX (already imported at top)

    // Define columns to export
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

    // Create worksheet data
    const wsData = [
      columns,  // Header row
      ...filteredData.map((row) =>
        columns.map((col) => row[col] || '')  // Map data to columns
      ),
    ];

    // Create workbook and worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');

    // Set column widths
    ws['!cols'] = [
      { wch: 20 },  // Team Name
      { wch: 20 },  // Candidate's Name
      { wch: 25 },  // Email
      { wch: 15 },  // Mobile
      { wch: 15 },  // State
      { wch: 15 },  // City
      { wch: 20 },  // User type
      { wch: 25 },  // Course
      { wch: 20 },  // Qualification
      { wch: 18 },  // Year of Graduation
    ];

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD
    const filename = `Catalyst_Students_${timestamp}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };
  

  // ==================== STYLING ====================
  
  // Main container
  const containerStyle = {
    maxWidth: '2000px',
    margin: '0 auto',
    padding: spacing.xl,
    background: '#0a0c17',
    minHeight: '100vh',
  };

  // Row layout (2 columns)
    const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'stretch',           // ✅ Add this - makes both equal height
  };

  // Row layout (1 column full width)
  const rowFullStyle = {
    ...rowStyle,
    gridTemplateColumns: '1fr',
  };

  // Division (groups title + chart box)
  const divisionStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  // Division title styling
  const divisionTitleStyle = {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: spacing.md,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  // Cyan accent bar before titles
  const accentBarStyle = {
    width: '4px',
    height: '18px',
    background: `linear-gradient(180deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
    borderRadius: '2px',
  };

  // ==================== CHECK IF DATA LOADED ====================
  
  // If no data yet, show welcome screen
  if (data.length === 0) {
    // Welcome screen styling - NO centering (lets header stay at top)
    const welcomeContainerStyle = {
      maxWidth: '2000px',
      margin: '0 auto',
      padding: spacing.xl,
      background: 'linear-gradient(135deg, #080a12 0%, #1a1c2b 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    };

    // Wrapper to center the card only
    const welcomeCardWrapperStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.xl,
    };

    // Content inside card
    const welcomeContentStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: spacing.lg,
    };

    const welcomeTitleStyle = {
      fontSize: '48px',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: spacing.lg,
    };

    const welcomeSubtitleStyle = {
      fontSize: '24px',
      fontWeight: 500,
      color: colors.accent,
      marginBottom: spacing.xl,
    };

    const welcomeDescriptionStyle = {
      fontSize: '16px',
      color: colors.textMuted,
      maxWidth: '600px',
      lineHeight: '1.6',
      marginBottom: spacing.xl,
    };

    // ✅ UPDATED - Greyish white background
    const welcomeBoxStyle = {
      background: '#f5f5f7',                        // Greyish white
      border: `2px dashed ${colors.accent}`,
      borderRadius: '16px',
      padding: spacing.xl,
      maxWidth: '500px',
      width: '100%',
      marginBottom: spacing.xl,
    };

    const welcomeBoxTitleStyle = {
      fontSize: '20px',
      fontWeight: 600,
      color: '#1a1a1a',                            // Dark text for contrast
      marginBottom: spacing.lg,
    };

    const uploadButtonStyle = {
      background: 'linear-gradient(135deg, #00D9FF 0%, #00BCD4 100%)',
      color: colors.background,
      border: 'none',
      padding: '15px 40px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '16px',
      transition: 'all 0.3s',
    };

    // Professional Card Container
    const welcomeCardStyle = {
      background: 'linear-gradient(135deg, #1a1f3a 0%, #232a47 100%)',
      border: `2px solid ${colors.accent}`,
      borderRadius: '24px',
      padding: spacing.xl * 2,
      maxWidth: '750px',
      width: '90%',
      boxShadow: '0 20px 60px rgba(0, 217, 255, 0.15)',
      backdropFilter: 'blur(10px)',
    };

    return (
      <div style={welcomeContainerStyle}>
        {/* Header at top - left title, right buttons */}
        <Header
          onFileSelect={handleFileChange}
          status={status}
          statusType={statusType}
          onClearFilters={() => clearAllFilters()}
          isFiltering={false}
          loading={loading}
          dataLoaded={dataLoaded}
          onGoBack={handleGoBack}
        />

        {/* Welcome Card Wrapper - Centers the card */}
        <div style={welcomeCardWrapperStyle}>
          {/* Welcome Card Container */}
          <div style={welcomeCardStyle}>
            {/* Welcome Content Inside Card */}
            <div style={welcomeContentStyle}>
              {/* Welcome Title */}
              <div>
                <h1 style={welcomeTitleStyle}>WELCOME !</h1>
                <p style={welcomeSubtitleStyle}>Upload your data to get started</p>
              </div>

              {/* Description */}
              <p style={welcomeDescriptionStyle}>
                Upload a CSV or Excel file containing your student data to explore 
                comprehensive analytics, visualizations on your Catalyst Program.
              </p>

              {/* Upload Box */}
              <div style={welcomeBoxStyle}>
                <p style={welcomeBoxTitleStyle}>Upload Data File</p>
                <p style={{ color: '#666666', marginBottom: spacing.lg, fontSize: '14px' }}>
                  Supported formats: CSV, XLSX, XLS
                </p>
                
                <input
                  id="welcomeFileInput"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  style={{ display: 'none' }}
                  disabled={loading}
                />
                
                <button
                  style={uploadButtonStyle}
                  onClick={() => document.getElementById('welcomeFileInput').click()}
                  disabled={loading}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {loading ? '⏳ Loading...' : '📁 Select File'}
                </button>
              </div>

              {/* Error message if any */}
              {error && (
                <div style={{
                  background: '#3a1a1a',
                  color: colors.error,
                  padding: spacing.lg,
                  borderRadius: '8px',
                  border: `1px solid ${colors.error}`,
                  maxWidth: '500px',
                }}>
                  ❌ {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== DATA LOADED - SHOW DASHBOARD ====================
  
  // Check if any filters are active
  const isFiltering = Object.values(filters).some((v) => v !== null);

  return (
    <div style={containerStyle}>
      {/* ============= HEADER ============= */}
      <Header
        onFileSelect={handleFileChange}
        status={status}
        statusType={statusType}
        onClearFilters={() => clearAllFilters()}
        isFiltering={isFiltering}
        loading={loading}
        dataLoaded={dataLoaded}
        onGoBack={handleGoBack}
      />

            {/* ============= ROW 1: STATE & CITY CHARTS ============= */}
      <StateFilter
            data={filteredData}
            selectedState={filters.state}
            onStateSelect={(state) => updateFilter('state', state)}
          />
      <div style={rowStyle}>
        {/* State Chart Division */}
        <div style={divisionStyle}>
          {/* ✅ State Filter Dropdown */}
          
          
          <div style={divisionTitleStyle}>
            <div style={accentBarStyle} />
            STATE-WISE DISTRIBUTION
          </div>
          <ChartBox>
            <StateChart
              data={filteredData}
              onSelect={(state) => updateFilter('state', state)}
              selectedState={filters.state}
            />
          </ChartBox>
        </div>

        {/* City Chart Division */}
        <div style={divisionStyle}>
          <div style={divisionTitleStyle}>
            <div style={accentBarStyle} />
            {filters.state ? `CITIES IN ${filters.state.toUpperCase()}` : 'CITY WISE DISTRIBUTION'}
          </div>
          <ChartBox>
            <CityChart
              data={filteredData}
              selectedState={filters.state}
              onSelect={(city) => updateFilter('city', city)}
            />
          </ChartBox>
        </div>
      </div>

      {/* ============= ROW 2: KPI CARDS ============= */}
      <div style={rowFullStyle}>
        <div style={divisionStyle}>
          <div style={divisionTitleStyle}>
            <div style={accentBarStyle} />
            QUALIFICATION-WISE BREAKDOWN
          </div>
          <ChartBox minHeight="auto">
            <KPICards
              data={filteredData}
              onSelect={(qual) => updateFilter('qualification', qual)}
              selectedQualification={filters.qualification}
            />
          </ChartBox>
        </div>
      </div>

      {/* ============= ROW 3: COURSE CHART ============= */}
      <div style={rowFullStyle}>
        <div style={divisionStyle}>
          <div style={divisionTitleStyle}>
            <div style={accentBarStyle} />
            COURSE-WISE DISTRIBUTION
            <span style={{
              marginLeft: 'auto',
              fontSize: '13px',
              fontWeight: 400,
              color: colors.accent,
            }}>
              ({aggregateData(filteredData, 'Course').length} COURSES)
            </span>
          </div>
          <ChartBox>
            <CourseChart
              data={filteredData}
              onSelect={(course) => updateFilter('course', course)}
              selectedCourse={filters.course}
            />
          </ChartBox>
        </div>
      </div>

            {/* ============= STUDENT TABLE ============= */}
      <StudentTable data={filteredData} />

      {/* ✅ NEW! Export Button */}
      <div style={{
        marginTop: spacing.xl,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: spacing.md,
      }}>
        <button
          style={{
            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: spacing.md,
            transition: 'all 0.3s',
          }}
          onClick={handleExportToExcel}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(74, 222, 128, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ⬇️ Export to Excel
        </button>
      </div>
    </div>
  );
}