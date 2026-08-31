/**
 * City Chart Component
 * 
 * What it shows:
 * - Donut chart of cities
 * - If state is selected: shows top 8 cities in that state
 * - If no state selected: shows top 8 cities overall
 * - Each slice is clickable
 * 
 * Props:
 * - data: Filtered data
 * - selectedState: Currently selected state (or null)
 * - onSelect: Function called when user clicks a slice
 */

import { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colors, chartColors } from '../styles/theme';
import { aggregateData } from '../utils/dataProcessor';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CityChart = ({ data, selectedState, onSelect }) => {
  const chartRef = useRef(null);

  // Determine which data to show
  let aggregatedData = [];

  if (selectedState) {
    // A state is selected - show only its cities
    const stateData = data.filter((row) => row['State'] === selectedState);
    aggregatedData = aggregateData(stateData, 'city').slice(0, 8);
  } else {
    // No state selected - show all cities
    aggregatedData = aggregateData(data, 'city').slice(0, 8);
  }

  // Prepare data for Chart.js
  const chartData = {
    labels: aggregatedData.map((d) => d.name),           // City names
    datasets: [
      {
        data: aggregatedData.map((d) => d.count),        // Count for each city
        backgroundColor: chartColors,                    // Cyan colors
        borderColor: colors.cardBg,                      // Dark borders
        borderWidth: 2,                                  // 2px borders
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      // When user clicks on chart
      if (elements.length > 0) {
        const label = chartData.labels[elements[0].index];
        onSelect(label);
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: colors.text,
          font: { size: 11 },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: colors.accent,
        bodyColor: colors.text,
        borderColor: colors.accent,
        borderWidth: 1,
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