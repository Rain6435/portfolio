import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PriceOverTimeChart from './PriceOverTimeChart';
import NutritionVsPriceChart from './NutritionVsPriceChart';
import LanguageSelector from './LanguageSelector';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="dashboard-title">{t('title')}</h1>
              <p className="dashboard-subtitle">{t('subtitle')}</p>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Context Information */}
      <section className="dashboard-context">
        <div className="container-fluid px-4">
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            <strong>{t('chartContext')}</strong>
          </div>
          <div className="alert alert-light">
            <i className="bi bi-lightbulb me-2"></i>
            {t('interactionHelp')}
          </div>
        </div>
      </section>

      {/* Charts Container */}
      <main className="dashboard-main">
        <div className="container-fluid px-4">
          <div className="row g-4">
            {/* Price Over Time Chart - Full Width */}
            <div className="col-12">
              <div className="chart-container">
                <PriceOverTimeChart />
              </div>
            </div>
            
            {/* Nutrition vs Price Chart - Full Width Below */}
            <div className="col-12">
              <div className="chart-container">
                <NutritionVsPriceChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;