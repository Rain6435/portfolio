import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  foodPriceData,
  nutritionData,
  getTimeRangeData,
  getMonthLabel,
} from "./data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceOverTimeChart = () => {
  const { t, i18n } = useTranslation();
  const [selectedFoods, setSelectedFoods] = useState([
    "chicken",
    "apples",
    "broccoli",
  ]);
  const [enabledCategories, setEnabledCategories] = useState([
    "meat",
    "fruit",
    "vegetable",
  ]);
  const [timeRange, setTimeRange] = useState("1year");
  const [currency, setCurrency] = useState("cad");
  const [viewMode, setViewMode] = useState("chart");

  const allFoodOptions = Object.keys(foodPriceData);
  const categories = [
    "vegetable",
    "fruit",
    "meat",
    "fish",
    "dairy",
    "starch",
    "leafy",
  ];

  const getFoodsByCategory = (category) => {
    return allFoodOptions.filter(
      (food) => nutritionData[food].category === category
    );
  };

  const getVisibleFoods = () => {
    return allFoodOptions.filter((food) =>
      enabledCategories.some(
        (category) => nutritionData[food].category === category
      )
    );
  };

  const colorPalette = [
    "#3b82f6", // Blue
    "#ef4444", // Red
    "#10b981", // Green
    "#f59e0b", // Orange
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
  ];

  const generateChartData = () => {
    // Filter selected foods to only include those from enabled categories
    const visibleSelectedFoods = selectedFoods.filter((food) =>
      enabledCategories.some(
        (category) => nutritionData[food].category === category
      )
    );

    if (visibleSelectedFoods.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Get time range data for the first visible selected food to get labels
    const firstFoodData = foodPriceData[visibleSelectedFoods[0]];
    const timeRangeData = getTimeRangeData(firstFoodData.prices, timeRange);

    const labels = Object.keys(timeRangeData).map((date) =>
      getMonthLabel(date, i18n.language)
    );

    const datasets = visibleSelectedFoods.map((food, index) => {
      const foodData = foodPriceData[food];
      const foodTimeRangeData = getTimeRangeData(foodData.prices, timeRange);

      const priceData = Object.values(foodTimeRangeData).map(
        (prices) => prices[currency]
      );

      return {
        label: `${t(food)} - ${t("pricePerKg")} (${currency.toUpperCase()})`,
        data: priceData,
        borderColor: colorPalette[index % colorPalette.length],
        backgroundColor: `${colorPalette[index % colorPalette.length]}20`,
        borderWidth: 2,
        pointBackgroundColor: colorPalette[index % colorPalette.length],
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.3,
      };
    });

    return {
      labels,
      datasets,
    };
  };

  const handleFoodToggle = (food) => {
    setSelectedFoods((prev) => {
      if (prev.includes(food)) {
        return prev.filter((f) => f !== food);
      } else {
        return [...prev, food];
      }
    });
  };

  const handleCategoryToggle = (category) => {
    setEnabledCategories((prev) => {
      if (prev.includes(category)) {
        // Remove category but keep food selections (persistence)
        return prev.filter((c) => c !== category);
      } else {
        // Add category
        return [...prev, category];
      }
    });
  };

  const generateTableData = () => {
    // Filter selected foods to only include those from enabled categories
    const visibleSelectedFoods = selectedFoods.filter((food) =>
      enabledCategories.some(
        (category) => nutritionData[food].category === category
      )
    );

    if (visibleSelectedFoods.length === 0) return [];

    const firstFoodData = foodPriceData[visibleSelectedFoods[0]];
    const timeRangeData = getTimeRangeData(firstFoodData.prices, timeRange);
    const labels = Object.keys(timeRangeData);

    return labels.map((date) => {
      const row = { date: getMonthLabel(date, i18n.language) };
      visibleSelectedFoods.forEach((food) => {
        const foodData = foodPriceData[food];
        const foodTimeRangeData = getTimeRangeData(foodData.prices, timeRange);
        const price = foodTimeRangeData[date]
          ? foodTimeRangeData[date][currency]
          : 0;
        row[food] = price.toFixed(2);
      });
      return row;
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#111827",
          font: {
            size: 12,
            weight: 600,
            family: "Inter",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#3b82f6",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: "Inter",
          weight: 600,
        },
        bodyFont: {
          family: "Inter",
          weight: 400,
        },
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: t("month"),
          color: "#6b7280",
          font: {
            size: 14,
            weight: 600,
            family: "Inter",
          },
        },
        ticks: {
          color: "#6b7280",
          maxTicksLimit: 8,
          font: {
            family: "Inter",
            size: 12,
          },
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
          borderDash: [5, 5],
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `${t("price")} (${currency.toUpperCase()})`,
          color: "#6b7280",
          font: {
            size: 14,
            weight: 600,
            family: "Inter",
          },
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "Inter",
            size: 12,
          },
          callback: function (value) {
            return value.toFixed(2);
          },
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
          borderDash: [5, 5],
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <div className="price-over-time-chart">
      {/* Chart Header */}
      <div className="chart-header">
        <h3 className="chart-title">{t("priceOverTime")}</h3>
        <div className="chart-controls">
          <div className="control-group">
            <label htmlFor="time-range-select">{t("selectTimeRange")}</label>
            <select
              id="time-range-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="form-select"
            >
              <option value="6months">{t("6months")}</option>
              <option value="1year">{t("1year")}</option>
              <option value="2years">{t("2years")}</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="currency-select">{t("selectCurrency")}</label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-select"
            >
              <option value="cad">{t("cad")}</option>
              <option value="usd">{t("usd")}</option>
              <option value="eur">{t("eur")}</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="view-mode-select">{t("viewMode")}</label>
            <select
              id="view-mode-select"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="form-select"
            >
              <option value="chart">{t("chartView")}</option>
              <option value="table">{t("tableView")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Toggles */}
      <div className="category-toggles mb-3">
        <label className="form-label">{t("selectFoods")}</label>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((category) => (
            <div key={category} className="form-check category-toggle">
              <input
                className="form-check-input"
                type="checkbox"
                id={`category-${category}`}
                checked={enabledCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <label
                className="form-check-label category-label"
                htmlFor={`category-${category}`}
              >
                {t(category)}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Split Layout: Table on Left, Chart on Right */}
      <div className="row g-3">
        {/* Left Column: Food Selection Table */}
        <div className="col-12 col-lg-5">
          <div className="food-selector-container">
            <div className="food-selection-table">
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th className="food-header">Food</th>
                    {enabledCategories.map((category) => (
                      <th key={category} className="category-header">
                        {t(category)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getVisibleFoods().map((food) => (
                    <tr key={food}>
                      <td className="food-name-cell">
                        <strong>{t(food)}</strong>
                      </td>
                      {enabledCategories.map((category) => (
                        <td key={category} className="food-checkbox-cell">
                          {getFoodsByCategory(category).includes(food) && (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`food-time-${food}`}
                                checked={selectedFoods.includes(food)}
                                onChange={() => handleFoodToggle(food)}
                              />
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Chart or Table View */}
        <div className="col-12 col-lg-7">
          <div className="data-display">
            {viewMode === "chart" ? (
              <div className="chart-canvas">
                <Line data={generateChartData()} options={options} />
              </div>
            ) : (
              <div className="table-view">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>{t("month")}</th>
                        {selectedFoods
                          .filter((food) =>
                            enabledCategories.some(
                              (category) =>
                                nutritionData[food].category === category
                            )
                          )
                          .map((food) => (
                            <th key={food}>
                              {t(food)} ({currency.toUpperCase()})
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {generateTableData().map((row, index) => (
                        <tr key={index}>
                          <td className="fw-bold">{row.date}</td>
                          {selectedFoods
                            .filter((food) =>
                              enabledCategories.some(
                                (category) =>
                                  nutritionData[food].category === category
                              )
                            )
                            .map((food) => (
                              <td key={food} className="text-end">
                                {row[food]}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceOverTimeChart;
