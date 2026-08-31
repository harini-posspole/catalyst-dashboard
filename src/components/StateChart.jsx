/**
 * State Chart Component
 * 
 * What it shows:
 * - Pie chart showing top 15 states
 * - Each slice is clickable
 * - Click a state → filters all data by that state
 * 
 * Props:
 * - data: The data to display (array of records)
 * - onSelect: Function called when user clicks a slice
 * - selectedState: Current selected state (for highlighting)
 */

import { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colors, chartColors } from '../styles/theme';
import { aggregateData } from '../utils/dataProcessor';

// Register Chart.js components (required for charts to work)
ChartJS.register(ArcElement, Tooltip, Legend);

export const StateChart = ({ data, onSelect, selectedState }) => {
  const chartRef = useRef(null);

  // Aggregate data: count records by state, get top 15
  const aggregatedData = aggregateData(data, 'State').slice(0, 15);

  // Prepare data for Chart.js
  const chartData = {
    labels: aggregatedData.map((d) => d.name),           // State names
    datasets: [
      {
        data: aggregatedData.map((d) => d.count),        // Count for each state
        backgroundColor: chartColors,                    // Cyan colors
        borderColor: colors.cardBg,                      // Dark borders
        borderWidth: 2,                                  // 2px borders
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,                                   // Responsive size
    maintainAspectRatio: false,                        // Don't maintain aspect ratio
    onClick: (event, elements) => {
      // When user clicks on chart
      if (elements.length > 0) {
        // Get which slice was clicked
        const label = chartData.labels[elements[0].index];
        // Tell parent component about the selection
        onSelect(label);
      }
    },
    plugins: {
      legend: {
        display: true,                                  // Show legend
        labels: {
          color: colors.text,                          // Light text
          font: { size: 11 },                          // Small font
          padding: 15,                                 // Padding around labels
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',         // Dark tooltip
        titleColor: colors.accent,                     // Cyan title
        bodyColor: colors.text,                        // Light body text
        borderColor: colors.accent,                    // Cyan border
        borderWidth: 1,                                // 1px border
      },
    },
  };

  return (
    <Doughnut 
      ref={chartRef} 
      data={chartData} 
      options={options} 
    />
  );
};