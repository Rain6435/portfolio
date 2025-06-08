import React from "react";
import { useNavigate } from '@tanstack/react-router';
import { Calendar, Clock, Edit, X } from "lucide-react";
import { useServiceSite } from './ServiceSiteWrapper';
import BookingModal from './BookingModal';
import "./ServiceSite.css";

const ServiceSiteAppointmentsPage = () => {
  const navigate = useNavigate();
  
  const {
    services,
    availableSlots,
    appointments,
    setAppointments,
    selectedService,
    editingAppointment,
    isEditMode,
    showBookingForm,
    handleEditAppointment,
    handleConfirmBooking,
    handleUpdateAppointment,
    handleCloseBooking
  } = useServiceSite();

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
        )
      );
    }
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this appointment?"
      )
    ) {
      setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200";
      default:
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200";
    }
  };

  const handleNavigateToServices = () => {
    navigate({ to: '/projects/service-site/services' });
  };

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 lg:px-9">
          <h1 className="text-4xl lg:text-6xl font-bold text-gradient-primary mb-6">
            My Appointments
          </h1>

          {/* Empty State */}
          <div className="bg-white rounded-2xl p-12 lg:p-20 text-center shadow-lg border border-cyan-100">
            <div className="text-6xl lg:text-8xl mb-6 opacity-60">📅</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No Appointments Yet</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
              You haven't scheduled any appointments yet. Book your first
              appointment to get started.
            </p>
            <button
              onClick={handleNavigateToServices}
              className="bg-gradient-primary text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 focus-ring"
            >
              Book Your First Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 lg:px-9">
        <h1 className="text-4xl lg:text-6xl font-bold text-gradient-primary mb-6">
          My Appointments
        </h1>

        <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-12 max-w-4xl">
          Manage your upcoming and past appointments. You can reschedule or cancel
          appointments as needed.
        </p>

        {/* Appointments Grid */}
        <div className="space-y-6">
          {appointments.map((appointment, index) => (
            <div 
              key={appointment.id} 
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-cyan-100 hover-lift transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Appointment Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                        {appointment.petName}
                      </h3>
                      <div className="text-lg font-semibold text-gradient-primary mb-3">
                        {appointment.service}
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyles(appointment.status)}`}>
                      {appointment.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar size={18} className="text-cyan-600" />
                      <span className="font-medium">{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock size={18} className="text-cyan-600" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-slate-700">Pet Type:</span>
                        <span className="ml-2 text-slate-600">{appointment.petType}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Owner:</span>
                        <span className="ml-2 text-slate-600">{appointment.ownerName}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Phone:</span>
                        <span className="ml-2 text-slate-600">{appointment.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 lg:w-auto w-full">
                  {appointment.status !== "cancelled" ? (
                    <>
                      <button
                        onClick={() => handleEditAppointment(appointment)}
                        className="flex items-center justify-center gap-2 bg-gradient-primary text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 focus-ring"
                      >
                        <Edit size={16} />
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 focus-ring"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 focus-ring"
                    >
                      <X size={16} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default ServiceSiteAppointmentsPage;