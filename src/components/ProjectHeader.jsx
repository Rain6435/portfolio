// src/components/ProjectHeader.jsx
import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import NavigationUtils from '../utils/navigation';
import './ProjectHeader.css';

function ProjectHeader({ title, description, pathname }) {
  const navigate = useNavigate();
  const projectName = NavigationUtils.getProjectName(pathname);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    
    if (path.startsWith('#')) {
      // Navigate to home first, then scroll to section
      navigate({ to: '/' });
      setTimeout(() => NavigationUtils.scrollToSection(path), 100);
    } else {
      navigate({ to: path });
    }
  };

  return (
    <div className="project-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="project-info">
              <h1 className="project-title">
                {title || projectName}
              </h1>
              {description && (
                <p className="project-description lead">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-4 text-md-end">
            <div className="project-actions">
              <Link
                to="/#projects"
                className="btn btn-outline-primary me-2"
                onClick={(e) => handleNavigation(e, "/#projects")}
              >
                <i className="bi bi-grid-3x3-gap me-2"></i>
                All Projects
              </Link>
              <Link
                to="/"
                className="btn btn-primary"
                onClick={(e) => handleNavigation(e, "/")}
              >
                <i className="bi bi-house me-2"></i>
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;