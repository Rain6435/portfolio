import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { priceVsNutritionData, nutritionData } from './data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NutritionVsPriceChart = () => {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState('caloriesPerDollar');
  const [showLabels, setShowLabels] = useState(true);

  const metricOptions = [
    'caloriesPerDollar',
    'proteinPerDollar',
    'vitaminCPerDollar',
    'nutritionScore'
  ];

  const foodOptions = Object.keys(priceVsNutritionData);

  const generateChartData = () => {
    const data = foodOptions.map((food) => {
      const foodData = priceVsNutritionData[food];
      const nutritionInfo = nutritionData[food];
      
      let yValue;
      switch (selectedMetric) {
        case 'caloriesPerDollar':
          yValue = foodData.caloriesPerDollar;
          break;
        case 'proteinPerDollar':
          yValue = foodData.proteinPerDollar;
          break;
        case 'vitaminCPerDollar':
          yValue = foodData.vitaminCPerDollar;
          break;
        case 'nutritionScore':
          yValue = foodData.nutritionScore;
          break;
        default:
          yValue = foodData.caloriesPerDollar;
      }

      return {
        x: foodData.pricePerKg,
        y: yValue,
        label: food,
        category: nutritionInfo.category
      };
    });

    // Group by category for different colors
    const categoryColors = {
      'vegetable': '#10b981',  // Green
      'starch': '#f59e0b',     // Orange
      'leafy': '#3b82f6',      // Blue
      'fruit': '#8b5cf6',      // Purple
      'meat': '#ef4444',       // Red
      'fish': '#06b6d4',       // Cyan
      'dairy': '#f97316'       // Orange (darker)
    };

    const datasets = Object.keys(categoryColors).map(category => {
      const categoryData = data.filter(item => 
        nutritionData[item.label].category === category
      );

      return {
        label: category.charAt(0).toUpperCase() + category.slice(1),
        data: categoryData,
        backgroundColor: categoryColors[category],
        borderColor: categoryColors[category],
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: '#ffffff',
      };
    });

    return {
      datasets,
    };
  };

  const getMetricLabel = (metric) => {
    switch (metric) {
      case 'caloriesPerDollar':
        return t('caloriesPerDollar');
      case 'proteinPerDollar':
        return t('proteinPerDollar');
      case 'vitaminCPerDollar':
        return t('vitaminCPerDollar');
      case 'nutritionScore':
        return t('nutritionScore');
      default:
        return metric;
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#111827',
          font: {
            size: 12,
            weight: 600,
            family: 'Inter'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'point',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: 'Inter',
          weight: 600
        },
        bodyFont: {
          family: 'Inter',
          weight: 400
        },
        callbacks: {
          title: function(context) {
            return t(context[0].raw.label);
          },
          label: function(context) {
            const price = context.parsed.x.toFixed(2);
            const metric = context.parsed.y.toFixed(2);
            return [
              `${t('pricePerKg')}: $${price}`,
              `${getMetricLabel(selectedMetric)}: ${metric}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: t('pricePerKg') + ' (CAD)',
          color: '#6b7280',
          font: {
            size: 14,
            weight: 600,
            family: 'Inter'
          }
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: 'Inter',
            size: 12
          },
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          borderDash: [5, 5]
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: getMetricLabel(selectedMetric),
          color: '#6b7280',
          font: {
            size: 14,
            weight: 600,
            family: 'Inter'
          }
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: 'Inter',
            size: 12
          },
          callback: function(value) {
            return value.toFixed(2);
          }
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          borderDash: [5, 5]
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'xy',
      intersect: false
    },
    elements: {
      point: {
        hoverBorderWidth: 3
      }
    }
  };

  return (
    <div className="nutrition-vs-price-chart">
      <div className="chart-header">
        <h3 className="chart-title">{t('nutritionVsPrice')}</h3>
        <div className="chart-controls">
          <div className="control-group">
            <label htmlFor="metric-select">{t('selectMetric')}</label>
            <select
              id="metric-select"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="form-select"
            >
              {metricOptions.map(metric => (
                <option key={metric} value={metric}>
                  {getMetricLabel(metric)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="show-labels"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="show-labels">
                Show Labels
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-info mb-3">
        <div className="alert alert-light">
          <small>
            <strong>Analysis:</strong> This scatter plot shows the relationship between food prices and their nutritional value. 
            Foods in the upper-left quadrant offer the best nutritional value per dollar spent.
          </small>
        </div>
      </div>
      
      <div className="chart-canvas">
        <Scatter data={generateChartData()} options={options} />
      </div>
    </div>
  );
};

export default NutritionVsPriceChart;