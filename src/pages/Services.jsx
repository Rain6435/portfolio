import React from "react";
import { Link } from "@tanstack/react-router";

function Services() {
  return (
    <div className="services-container">
      <nav className="petfam-nav">
        <div className="brand-container">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0024ad6138d412de3fcef6c673bf88cc52e2595?placeholderIfAbsent=true"
            alt="PetFam Logo"
            className="brand-logo"
          />
          <div className="brand-name">PetFam</div>
        </div>

        <div className="nav-links">
          <Link
            to="/projects/service-site/"
            className="nav-item nav-item-active"
          >
            Home
          </Link>
          <Link to="/projects/service-site/services" className="nav-item">
            Services
          </Link>
          <Link to="/projects/service-site/contact" className="nav-item">
            Contact
          </Link>
          <Link to="/projects/service-site/about" className="nav-item">
            About us
          </Link>
        </div>
      </nav>

      <main className="services-content">
        <h1>Our Services</h1>
        {/* Add service details here */}
      </main>
    </div>
  );
}
export default Services;
