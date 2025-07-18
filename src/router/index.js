// src/router/index.js
import { Router, createRoute, createRootRoute } from "@tanstack/react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home";
import GamePage from "../pages/Game";
import EcommercePage from "../pages/Ecommerce";
import AnalyticsPage from "../pages/Analytics";
import NotFoundPage from "../pages/NotFound";
import ServiceSiteHomePage from "../pages/ServiceSite/ServiceSiteHomePage";
import ServiceSiteServicesPage from "../pages/ServiceSite/ServiceSiteServicesPage";
import ServiceSiteAppointmentsPage from "../pages/ServiceSite/ServiceSiteAppointmentsPage";
import ServiceSiteAboutUsPage from "../pages/ServiceSite/ServiceSiteAboutUsPage";

// Create a root route
const rootRoute = new createRootRoute({
  component: RootLayout,
});

// Define routes with metadata for better navigation handling
const indexRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  meta: {
    title: "Portfolio",
    type: "home"
  }
});

// Projects parent route for better organization
const projectsRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  meta: {
    title: "Projects",
    type: "projects"
  }
});

// ServiceSite Routes
const serviceSiteHomeRoute = new createRoute({
  getParentRoute: () => projectsRoute,
  path: "/service-site",
  component: ServiceSiteHomePage,
  meta: {
    title: "Service Website",
    type: "service-site",
    description: "Dental Clinic Redesign"
  }
});

const serviceSiteServicesRoute = new createRoute({
  getParentRoute: () => projectsRoute,
  path: "/service-site/services",
  component: ServiceSiteServicesPage,
  meta: {
    title: "Services",
    type: "service-site",
    parent: "Service Website"
  }
});

const serviceSiteAppointmentsRoute = new createRoute({
  getParentRoute: () => projectsRoute,
  path: "/service-site/appointments",
  component: ServiceSiteAppointmentsPage,
  meta: {
    title: "Appointments",
    type: "service-site",
    parent: "Service Website"
  }
});

const serviceSiteAboutRoute = new createRoute({
  getParentRoute: () => projectsRoute,
  path: "/service-site/about",
  component: ServiceSiteAboutUsPage,
  meta: {
    title: "About Us",
    type: "service-site",
    parent: "Service Website"
  }
});

// Other Project Routes
const gameRoute = new createRoute({
  getParentRoute: () => projectsRoute,
  path: "/game",
  component: GamePage,
  meta: {
    title: "Interactive Game",
    type: "project",
    description: "Memory Flow Game"
  }
});

const ecommerceRoute = new createRoute({
  getParentRoute: () => projectsRoute,
  path: "/ecommerce",
  component: EcommercePage,
  meta: {
    title: "E-Commerce Platform",
    type: "project",
    description: "Shopping Experience"
  }
});

const analyticsRoute = new createRoute({
  getParentRoute: () => projectsRoute,
  path: "/analytics",
  component: AnalyticsPage,
  meta: {
    title: "Analytics Dashboard",
    type: "project",
    description: "Food Price Analysis"
  }
});

const notFoundRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
  meta: {
    title: "Page Not Found",
    type: "error"
  }
});

// Create the router with all routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute.addChildren([
    serviceSiteHomeRoute,
    serviceSiteServicesRoute,
    serviceSiteAppointmentsRoute,
    serviceSiteAboutRoute,
    gameRoute,
    ecommerceRoute,
    analyticsRoute,
  ]),
  notFoundRoute,
]);

// Route configuration for easier access
export const routeConfig = {
  home: "/",
  projects: {
    serviceSite: "/projects/service-site",
    serviceSiteServices: "/projects/service-site/services", 
    serviceSiteAppointments: "/projects/service-site/appointments",
    serviceSiteAbout: "/projects/service-site/about",
    game: "/projects/game",
    ecommerce: "/projects/ecommerce",
    analytics: "/projects/analytics"
  }
};

// Create and export the router
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
  basepath: "/portfolio",
  defaultScrollBehavior: {
    preventScrollRestoration: true,
  },
});

export default router;
