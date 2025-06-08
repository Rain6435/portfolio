// src/pages/ServiceSite/ServiceSiteLayout.jsx
import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { ServiceSiteProvider } from './ServiceSiteWrapper';

const ServiceSiteLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <ServiceSiteProvider>
        <Outlet />
      </ServiceSiteProvider>
    </div>
  );
};

export default ServiceSiteLayout;