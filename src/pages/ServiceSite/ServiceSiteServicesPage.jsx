import React, { useState } from "react";
import { useNavigate } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Info, Star, Award, Heart } from "lucide-react";
import { useServiceSite } from './ServiceSiteWrapper';
import ServiceSiteNavigation from './ServiceSiteNavigation';
import BookingModal from './BookingModal';
import "./ServiceSite.css";

const ServiceSiteServicesPage = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  
  const {
    services,
    availableSlots,
    selectedService: contextSelectedService,
    editingAppointment,
    isEditMode,
    showBookingForm,
    handleBookAppointment,
    handleConfirmBooking,
    handleUpdateAppointment,
    handleCloseBooking
  } = useServiceSite();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleBookNow = (service) => {
    handleBookAppointment(service);
  };

  const handleNavigateToAppointments = () => {
    navigate({ to: '/projects/service-site/appointments' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <ServiceSiteNavigation />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 pt-20 pb-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
            {/* Hero Content */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-float">
                <Star size={16} />
                Professional Veterinary Services
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Complete
                <span className="text-gradient-primary"> Pet Care</span>
                <br />Solutions
              </h1>
              <p className="text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto mb-8">
                Transparent pricing, expert care, and personalized service for your beloved companions. 
                Every procedure includes detailed consultation and comprehensive follow-up care.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 text-slate-600">
                <div className="flex items-center gap-2">
                  <Award className="text-cyan-600" size={20} />
                  <span className="font-semibold">Licensed Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="text-red-500" size={20} />
                  <span className="font-semibold">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-green-600" size={20} />
                  <span className="font-semibold">24/7 Emergency Care</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200 to-pink-300 rounded-full opacity-20 translate-y-24 -translate-x-24"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Quick Service Overview */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services at a Glance</h2>
              <p className="text-lg text-slate-700">Compare our services and pricing to find what's right for your pet</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`service-card-special p-6 rounded-2xl cursor-pointer transition-all duration-300 hover-lift ${
                    selectedService?.id === service.id 
                      ? 'ring-2 ring-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50' 
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="text-4xl mb-4 text-center">{service.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 text-center mb-2">{service.name}</h3>
                  <div className="text-center">
                    <div className="text-cyan-700 font-bold text-xl mb-1">{service.price}</div>
                    <div className="text-slate-600 text-sm font-medium">{service.duration}</div>
                  </div>
                  
                  {selectedService?.id === service.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(service);
                        }}
                        className="w-full bg-gradient-primary text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Service Information */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Detailed Service Information</h2>
              <p className="text-lg text-slate-700">Everything you need to know about our veterinary services</p>
            </div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover-lift transition-all duration-500"
                >
                  <div className="lg:flex">
                    {/* Service Image/Icon Section */}
                    <div className="lg:w-1/3 bg-gradient-to-br from-cyan-500 to-blue-600 p-12 flex flex-col justify-center items-center text-white">
                      <div className="text-8xl mb-6">{service.icon}</div>
                      <h3 className="text-3xl font-bold text-center mb-4">{service.name}</h3>
                      <p className="text-cyan-100 text-center text-lg">{service.description}</p>
                    </div>

                    {/* Service Details Section */}
                    <div className="lg:w-2/3 p-8 lg:p-12">
                      <div className="mb-8">
                        <h4 className="text-2xl font-bold text-slate-900 mb-4">What's Included</h4>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">{service.details}</p>
                        
                        {/* Price and Duration */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200">
                            <div className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-2">Investment</div>
                            <div className="text-3xl font-bold text-emerald-700">{service.price}</div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                            <div className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2">Duration</div>
                            <div className="text-3xl font-bold text-blue-700">{service.duration}</div>
                          </div>
                        </div>

                        {/* Procedures */}
                        {service.procedures && (
                          <div className="mb-8">
                            <h5 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <CheckCircle className="text-emerald-600" size={24} />
                              Procedure Steps
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {service.procedures.map((procedure, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <span className="text-slate-800 font-medium">{procedure}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Requirements */}
                        {service.requirements && (
                          <div className="mb-8">
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                              <h5 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="text-amber-600" size={20} />
                                Important Pre-Procedure Requirements
                              </h5>
                              <div className="space-y-3">
                                {service.requirements.map((req, idx) => (
                                  <div key={idx} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-amber-800 font-medium">{req}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Book Button */}
                        <button
                          onClick={() => handleBookNow(service)}
                          className="w-full bg-gradient-primary text-white font-bold text-xl py-4 px-8 rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 focus-ring"
                        >
                          Schedule {service.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Contact & Availability Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-white mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Schedule?</h2>
              <p className="text-xl text-slate-300">Multiple ways to book your appointment</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <Phone size={40} className="text-cyan-400" />,
                  title: "Call Us",
                  content: "(613) 555-PAWS",
                  subtitle: "Speak with our team directly",
                  action: "Call Now"
                },
                {
                  icon: <MapPin size={40} className="text-cyan-400" />,
                  title: "Visit Our Clinic",
                  content: "123 Pet Care Lane\nOttawa, ON K1A 0A1",
                  subtitle: "Walk-ins welcome for emergencies",
                  action: "Get Directions"
                },
                {
                  icon: <Clock size={40} className="text-cyan-400" />,
                  title: "Operating Hours",
                  content: "Mon-Fri: 8AM-7PM\nWeekends: 9AM-5PM",
                  subtitle: "Emergency services available 24/7",
                  action: "View Schedule"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm hover-lift transition-all duration-300">
                  <div className="flex justify-center mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-slate-200 whitespace-pre-line mb-4">{item.content}</p>
                  <p className="text-sm text-slate-400 mb-6">{item.subtitle}</p>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>

            {/* This Week's Availability */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-center mb-8">This Week's Available Appointments</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { day: "Wednesday", date: "June 5th", times: ["9:00 AM", "2:00 PM", "4:30 PM"] },
                  { day: "Thursday", date: "June 6th", times: ["10:00 AM", "1:00 PM", "3:00 PM"] },
                  { day: "Friday", date: "June 7th", times: ["9:30 AM", "11:00 AM", "2:30 PM"] }
                ].map((slot, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 text-slate-900">
                    <div className="text-center mb-4">
                      <div className="text-xl font-bold text-slate-900">{slot.day}</div>
                      <div className="text-sm text-slate-600">{slot.date}</div>
                    </div>
                    <div className="space-y-2">
                      {slot.times.map((time, timeIndex) => (
                        <div key={timeIndex} className="bg-emerald-50 text-emerald-700 text-center py-2 px-4 rounded-lg font-medium">
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-slate-300 mb-4">Click any service above to book these available times</p>
                <button 
                  onClick={handleNavigateToAppointments}
                  className="bg-gradient-primary text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  View All Appointments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={showBookingForm}
        onClose={handleCloseBooking}
        services={services}
        availableSlots={availableSlots}
        onConfirmBooking={handleConfirmBooking}
        preselectedService={contextSelectedService}
        editingAppointment={editingAppointment}
        onUpdateAppointment={handleUpdateAppointment}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ServiceSiteServicesPage;