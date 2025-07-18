import React, { useEffect } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ServiceSiteNavigation from "../pages/ServiceSite/ServiceSiteNavigation";
import { ServiceSiteProvider } from "../pages/ServiceSite/ServiceSiteWrapper";
import NavigationUtils from "../utils/navigation";
import "./RootLayout.css";

function RootLayout() {
  const location = useLocation();

  // Use navigation utils for better route detection
  const isServiceSiteRoute = NavigationUtils.isServiceSitePage(location.pathname);
  const isHomePage = NavigationUtils.isHomePage(location.pathname);
  const isProjectPage = NavigationUtils.isProjectPage(location.pathname);
  const isNotFoundPage = NavigationUtils.isNotFoundPage(location.pathname);

  // Set up custom cursor across all pages
  useEffect(() => {
    // Create custom cursors for all pages
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    const cursorDot = document.createElement("div");
    cursorDot.classList.add("custom-cursor-dot");
    document.body.appendChild(cursorDot);

    // Handle mouse movement for both cursors
    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Create moving background blur (only for non-ServiceSite routes)
    let blur;
    let handleMouseMoveBlur;
    if (!isServiceSiteRoute) {
      blur = document.createElement("div");
      blur.classList.add("background-blur");
      document.body.appendChild(blur);

      handleMouseMoveBlur = (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        blur.style.left = `${x}%`;
        blur.style.top = `${y}%`;
      };

      document.addEventListener("mousemove", handleMouseMoveBlur);
    }

    // Change cursor style for links and buttons
    const handleLinkHoverIn = () => {
      cursor.classList.add("cursor-link");
      cursorDot.classList.add("cursor-dot-link");
    };

    const handleLinkHoverOut = () => {
      cursor.classList.remove("cursor-link");
      cursorDot.classList.remove("cursor-dot-link");
    };

    // Function to apply link events
    const applyLinkEvents = () => {
      const links = document.querySelectorAll(
        'a, button, .btn, [role="button"]'
      );
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleLinkHoverIn);
        link.addEventListener("mouseleave", handleLinkHoverOut);
        link.style.cursor = "none"; // Ensure no cursor on links
      });
    };

    // Apply initially
    applyLinkEvents();

    // Also apply after DOM changes using MutationObserver
    const observer = new MutationObserver(() => {
      applyLinkEvents();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Change cursor color based on section (only for main portfolio pages)
    if (!isServiceSiteRoute) {
      const sectionColors = [
        { id: "about", class: "cursor-about", dotClass: "cursor-dot-about" },
        {
          id: "experience",
          class: "cursor-experience",
          dotClass: "cursor-dot-experience",
        },
        { id: "work", class: "cursor-work", dotClass: "cursor-dot-work" },
        {
          id: "projects",
          class: "cursor-projects",
          dotClass: "cursor-dot-projects",
        },
        {
          id: "contact",
          class: "cursor-contact",
          dotClass: "cursor-dot-contact",
        },
      ];

      // Function to check which section is in view
      const checkSectionInView = () => {
        const sections = sectionColors.map((section) =>
          document.getElementById(section.id)
        );

        // Remove all section-specific classes
        sectionColors.forEach((section) => {
          cursor.classList.remove(section.class);
          cursorDot.classList.remove(section.dotClass);
        });

        // Check if any section is in view and add appropriate class
        sections.forEach((section, index) => {
          if (section) {
            const rect = section.getBoundingClientRect();
            const isInView =
              rect.top <= window.innerHeight / 2 &&
              rect.bottom >= window.innerHeight / 2;

            if (isInView) {
              cursor.classList.add(sectionColors[index].class);
              cursorDot.classList.add(sectionColors[index].dotClass);
            }
          }
        });
      };

      // Check section on scroll
      window.addEventListener("scroll", checkSectionInView);
      // Initial check
      checkSectionInView();

      // Cleanup scroll listener
      return () => {
        window.removeEventListener("scroll", checkSectionInView);
      };
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (blur) {
        document.removeEventListener("mousemove", handleMouseMoveBlur);
      }
      observer.disconnect();

      // Remove elements
      if (cursor.parentNode) document.body.removeChild(cursor);
      if (cursorDot.parentNode) document.body.removeChild(cursorDot);
      if (blur && blur.parentNode) document.body.removeChild(blur);
    };
  }, [isServiceSiteRoute]);

  return (
    <ServiceSiteProvider>
      <ScrollToTop />
      <div className="layout-container">
        {/* Always show the standard header unless it's a ServiceSite route */}
        {isServiceSiteRoute ? (
          <ServiceSiteNavigation />
        ) : (
          <Header />
        )}


        <main className="layout-main">
          <Outlet />
        </main>

        {/* Only show footer on non-ServiceSite pages and non-NotFound pages */}
        {!isServiceSiteRoute && !isNotFoundPage && <Footer />}
      </div>
    </ServiceSiteProvider>
  );
}

export default RootLayout;
