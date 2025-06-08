import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { useServiceSite } from "./ServiceSiteWrapper";
import BookingModal from "./BookingModal";
import "./ServiceSite.css";

const ServiceSiteHomePage = () => {
  const navigate = useNavigate();
  const {
    services,
    availableSlots,
    selectedService,
    editingAppointment,
    isEditMode,
    showBookingForm,
    handleBookAppointment,
    handleConfirmBooking,
    handleUpdateAppointment,
    handleCloseBooking,
  } = useServiceSite();

  const handleNavigateToServices = () => {
    navigate({ to: "/projects/service-site/services" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="pt-20">
        <div className="flex flex-col lg:flex-row gap-10 px-4 lg:px-8 max-w-7xl mx-auto py-16">
          {/* Left Column */}
          <div className="flex flex-col w-full lg:w-3/5">
            {/* Hero Content */}
            <div className="flex-grow bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-cyan-100 animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold text-gradient-primary leading-tight mb-6">
                Professional
                <br />
                Veterinary Care
                <br />
                <span className="text-2xl lg:text-4xl text-cyan-600">
                  You Can Trust
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-8">
                Expert medical care for your beloved pets with transparent
                pricing and comprehensive services. From routine check-ups to
                specialized treatments, we provide professional veterinary care
                with clear information and upfront costs.
              </p>

              {/* Quick Info Section */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 mb-8 border border-cyan-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-cyan-600" />
                  Quick Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-slate-600 font-medium">
                      Hours
                    </div>
                    <div className="text-base text-slate-900 font-semibold">
                      Mon-Fri: 8AM-7PM
                    </div>
                    <div className="text-base text-slate-900 font-semibold">
                      Sat-Sun: 9AM-5PM
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 font-medium">
                      Emergency
                    </div>
                    <div className="text-base text-cyan-700 font-semibold">
                      24/7 Available
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 font-medium">
                      Phone
                    </div>
                    <div className="text-base text-slate-900 font-semibold">
                      (613) 555-PAWS
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNavigateToServices}
                className="bg-gradient-primary text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 no-print focus-ring"
              >
                <span>VIEW ALL SERVICES & PRICING</span>
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 lg:p-10 my-8 lg:my-12 shadow-xl border border-cyan-100 animate-fade-in-up">
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {[
                  { number: "15+", label: "Years Experience" },
                  { number: "24/7", label: "Emergency Care" },
                  { number: "10K+", label: "Pets Treated" },
                  { number: "100%", label: "Transparent Pricing" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-white rounded-2xl shadow-sm border border-cyan-50 hover-lift"
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-gradient-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-base text-slate-700 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col w-full lg:w-2/5">
            {/* Featured Image */}
            <div className="relative mb-8">
              <div className="w-full bg-gradient-primary rounded-3xl flex items-center justify-center text-6xl lg:text-8xl shadow-xl shadow-cyan-500/20 border-2 border-white/20">
                <img
                  src={`${import.meta.env.BASE_URL}logo-title.png`}
                  alt="Veterinary Clinic"
                  className="w-full object-cover rounded-3xl"
                />
              </div>
            </div>

            {/* Services Overview */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Our Services
                </h3>
                <button
                  onClick={handleNavigateToServices}
                  className="text-cyan-700 text-sm font-semibold underline hover:text-cyan-800 transition-colors focus-ring"
                >
                  View All Details →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    onClick={() => handleBookAppointment(service)}
                    className="relative bg-white p-6 rounded-2xl shadow-lg border border-cyan-100 cursor-pointer hover-lift hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 animate-fade-in-up focus-ring"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h4 className="text-base font-semibold text-slate-900 mb-2">
                      {service.name}
                    </h4>
                    <div className="text-sm text-cyan-700 font-semibold">
                      {service.price}
                    </div>

                    {/* Duration badge */}
                    {service.duration && (
                      <div className="absolute top-3 right-3 bg-cyan-50 text-cyan-700 text-xs font-semibold px-2 py-1 rounded-lg">
                        {service.duration}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Contact Quick Access */}
            <div className="bg-white rounded-2xl p-6 mt-8 shadow-lg border border-cyan-100 animate-fade-in-up">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                Visit Us Today
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-cyan-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      123 Pet Care Lane
                    </div>
                    <div className="text-xs text-slate-700">
                      Ottawa, ON K1A 0A1
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone
                    size={18}
                    className="text-cyan-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      (613) 555-PAWS
                    </div>
                    <div className="text-xs text-slate-700">
                      Call for appointments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BookingModal
        isOpen={showBookingForm}
        onClose={handleCloseBooking}
        services={services}
        availableSlots={availableSlots}
        onConfirmBooking={handleConfirmBooking}
        preselectedService={selectedService}
        editingAppointment={editingAppointment}
        onUpdateAppointment={handleUpdateAppointment}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ServiceSiteHomePage;
