// src/components/Breadcrumbs.jsx
import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import NavigationUtils from '../utils/navigation';
import './Breadcrumbs.css';

function Breadcrumbs({ pathname }) {
  const navigate = useNavigate();
  const breadcrumbs = NavigationUtils.generateBreadcrumbs(pathname);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    
    if (path.startsWith('#')) {
      // Handle anchor links - navigate to home first if not already there
      if (pathname !== '/') {
        navigate({ to: '/' });
        // Wait for navigation then scroll
        setTimeout(() => NavigationUtils.scrollToSection(path), 100);
      } else {
        NavigationUtils.scrollToSection(path);
      }
    } else {
      navigate({ to: path });
    }
  };

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="breadcrumb-nav" aria-label="breadcrumb">
      <div className="container">
        <ol className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <li 
              key={index} 
              className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}
            >
              {index === breadcrumbs.length - 1 ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  onClick={(e) => handleNavigation(e, crumb.path)}
                  className="breadcrumb-link"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumbs;