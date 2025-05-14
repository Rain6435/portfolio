// src/router/index.js
import { Router, createRoute, createRootRoute } from "@tanstack/react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home";
import ServiceSitePage from "../pages/ServiceSite";
import GamePage from "../pages/Game";
import EcommercePage from "../pages/Ecommerce";
import AnalyticsPage from "../pages/Analytics";
import NotFoundPage from "../pages/NotFound";

// Create a root route
const rootRoute = new createRootRoute({
  component: RootLayout,
});

// Define routes
const indexRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const serviceSiteRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/service-site",
  component: ServiceSitePage,
});

const gameRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/game",
  component: GamePage,
});

const ecommerceRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/ecommerce",
  component: EcommercePage,
});

const analyticsRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/analytics",
  component: AnalyticsPage,
});

const notFoundRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

// Create the router with all routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  serviceSiteRoute,
  gameRoute,
  ecommerceRoute,
  analyticsRoute,
  notFoundRoute,
]);

// Create and export the router with updated scroll restoration behavior
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
  // Add this key configuration for scroll management
  defaultScrollBehavior: {
    preventScrollRestoration: true, // Prevent browser's default scroll restoration
  },
});

export default router;
