import React, { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X, ArrowLeft } from "lucide-react";
import "./ServiceSite.css";

const ServiceSiteNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { key: "home", label: "Home", path: "/projects/service-site" },
    {
      key: "services",
      label: "Services",
      path: "/projects/service-site/services",
    },
    {
      key: "appointments",
      label: "My Appointments",
      path: "/projects/service-site/appointments",
    },
    { key: "about", label: "About Us", path: "/projects/service-site/about" },
  ];

  const handleNavClick = (path) => {
    navigate({ to: path });
    setIsMobileMenuOpen(false);
  };

  const handleBackToPortfolio = () => {
    navigate({ to: "/" });
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Back to Portfolio Button */}
          <button
            onClick={handleBackToPortfolio}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors focus-ring rounded-lg px-2 py-1"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </button>

          {/* Brand Container */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-cyan-500/20">
              <img
                className="rounded-full"
                src={`${import.meta.env.BASE_URL}logo-rounded.png`}
              />
            </div>
            <div className="text-gradient-primary text-2xl lg:text-3xl font-bold">
              PetFam Veterinary
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 relative group ${
                  isCurrentPage(item.path)
                    ? "bg-gradient-primary text-white shadow-lg shadow-cyan-500/30"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
                {!isCurrentPage(item.path) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-primary transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-ring"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isCurrentPage(item.path)
                      ? "bg-gradient-primary text-white shadow-lg shadow-cyan-500/30"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ServiceSiteNavigation;
