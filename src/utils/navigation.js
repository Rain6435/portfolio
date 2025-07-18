// src/utils/navigation.js
import { routeConfig } from '../router';

// Navigation utilities for better routing logic
export const NavigationUtils = {
  // Helper to normalize pathname (remove basepath if present)
  normalizePath: (pathname) => {
    if (pathname.startsWith('/portfolio')) {
      return pathname.replace('/portfolio', '') || '/';
    }
    return pathname;
  },

  // Check route types
  isHomePage: (pathname) => NavigationUtils.normalizePath(pathname) === "/",
  isProjectPage: (pathname) => NavigationUtils.normalizePath(pathname).startsWith("/projects/"),
  isServiceSitePage: (pathname) => NavigationUtils.normalizePath(pathname).startsWith("/projects/service-site"),
  isNotFoundPage: (pathname) => {
    const normalizedPath = NavigationUtils.normalizePath(pathname);
    const allValidPaths = [
      "/",
      "/projects/service-site",
      "/projects/service-site/services", 
      "/projects/service-site/appointments",
      "/projects/service-site/about",
      "/projects/game",
      "/projects/ecommerce", 
      "/projects/analytics"
    ];
    return !allValidPaths.includes(normalizedPath);
  },

  // Get route metadata
  getRouteType: (pathname) => {
    if (NavigationUtils.isHomePage(pathname)) return 'home';
    if (NavigationUtils.isServiceSitePage(pathname)) return 'service-site';
    if (NavigationUtils.isProjectPage(pathname)) return 'project';
    if (NavigationUtils.isNotFoundPage(pathname)) return 'error';
    return 'unknown';
  },

  // Get project name from path
  getProjectName: (pathname) => {
    const normalizedPath = NavigationUtils.normalizePath(pathname);
    const projectMap = {
      '/projects/service-site': 'Service Website',
      '/projects/game': 'Interactive Game', 
      '/projects/ecommerce': 'E-Commerce Platform',
      '/projects/analytics': 'Analytics Dashboard'
    };

    // Check for exact match first
    if (projectMap[normalizedPath]) return projectMap[normalizedPath];
    
    // Check for sub-routes
    for (const [path, name] of Object.entries(projectMap)) {
      if (normalizedPath.startsWith(path)) return name;
    }
    
    return null;
  },

  // Generate breadcrumbs
  generateBreadcrumbs: (pathname) => {
    const normalizedPath = NavigationUtils.normalizePath(pathname);
    const breadcrumbs = [{ label: 'Home', path: '/' }];
    
    if (NavigationUtils.isProjectPage(pathname)) {
      breadcrumbs.push({ label: 'Projects', path: '/#projects' });
      
      const projectName = NavigationUtils.getProjectName(pathname);
      if (projectName) {
        const projectPath = normalizedPath.split('/').slice(0, 3).join('/');
        breadcrumbs.push({ label: projectName, path: projectPath });
        
        // Add sub-page if applicable
        if (normalizedPath !== projectPath) {
          const subPage = normalizedPath.split('/').pop();
          const subPageMap = {
            'services': 'Services',
            'appointments': 'Appointments', 
            'about': 'About Us'
          };
          
          if (subPageMap[subPage]) {
            breadcrumbs.push({ label: subPageMap[subPage], path: normalizedPath });
          }
        }
      }
    }
    
    return breadcrumbs;
  },

  // Smooth scroll to section
  scrollToSection: (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },

  // Get section navigation for homepage
  getHomeSections: () => [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'How I Work', href: '#work' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ],

  // Get project navigation items
  getProjectNavigation: () => [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Contact', path: '/#contact' }
  ]
};

export default NavigationUtils;