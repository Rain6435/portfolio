// src/router/index.js
import { Router, createRoute, createRootRoute } from '@tanstack/react-router'
import RootLayout from '../layouts/RootLayout'
import HomePage from '../pages/Home'
import GamePage from '../pages/Game'
import EcommercePage from '../pages/Ecommerce'
import AnalyticsPage from '../pages/Analytics'
import NotFoundPage from '../pages/NotFound'
import ServiceSiteHomePage from '../pages/ServiceSite/ServiceSiteHomePage'
import ServiceSiteServicesPage from '../pages/ServiceSite/ServiceSiteServicesPage'
import ServiceSiteAppointmentsPage from '../pages/ServiceSite/ServiceSiteAppointmentsPage'
import ServiceSiteAboutUsPage from '../pages/ServiceSite/ServiceSiteAboutUsPage'
import VeterinaryWebsite from '../pages/StoryBoard1'
import VeterinaryWebsite2 from '../pages/StoryBoard2'

// Create a root route
const rootRoute = new createRootRoute({
  component: RootLayout,
})

// Define routes
const indexRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const serviceSiteStoryBoard1 = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/storyboard-1',
  component: VeterinaryWebsite,
})

const serviceSiteStoryBoard2 = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/storyboard-2',
  component: VeterinaryWebsite2,
})

// ServiceSite Routes
const serviceSiteHomeRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/service-site',
  component: ServiceSiteHomePage,
})

const serviceSiteServicesRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/service-site/services',
  component: ServiceSiteServicesPage,
})

const serviceSiteAppointmentsRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/service-site/appointments',
  component: ServiceSiteAppointmentsPage,
})

const serviceSiteAboutRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/service-site/about',
  component: ServiceSiteAboutUsPage,
})

// Other Project Routes
const gameRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/game',
  component: GamePage,
})

const ecommerceRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/ecommerce',
  component: EcommercePage,
})

const analyticsRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/analytics',
  component: AnalyticsPage,
})

const notFoundRoute = new createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
})

// Create the router with all routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  serviceSiteHomeRoute,
  serviceSiteServicesRoute,
  serviceSiteAppointmentsRoute,
  serviceSiteAboutRoute,
  serviceSiteStoryBoard1,
  serviceSiteStoryBoard2,
  gameRoute,
  ecommerceRoute,
  analyticsRoute,
  notFoundRoute,
])

// Create and export the router
export const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  basepath: '/portfolio',
  defaultScrollBehavior: {
    preventScrollRestoration: true
  }
})

export default router