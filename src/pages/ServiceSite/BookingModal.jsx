import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Info, CheckCircle, X } from 'lucide-react';
import "./ServiceSite.css";

const BookingModal = ({ 
  isOpen, 
  onClose, 
  services, 
  availableSlots, 
  onConfirmBooking,
  editingAppointment = null,
  onUpdateAppointment = null,
  isEditMode = false,
  preselectedService = null
}) => {
  const [appointmentData, setAppointmentData] = useState({
    petName: '',
    petType: '',
    service: '',
    date: '',
    time: '',
    ownerName: '',
    phone: '',
    specialRequests: ''
  });
  const [bookingStep, setBookingStep] = useState(1);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Initialize form data when editing or preselecting service
  useEffect(() => {
    if (isEditMode && editingAppointment) {
      setAppointmentData({
        petName: editingAppointment.petName || '',
        petType: editingAppointment.petType || '',
        service: editingAppointment.service || '',
        date: editingAppointment.date || '',
        time: editingAppointment.time || '',
        ownerName: editingAppointment.ownerName || '',
        phone: editingAppointment.phone || '',
        specialRequests: editingAppointment.specialRequests || ''
      });
    } else if (preselectedService) {
      setAppointmentData(prev => ({
        ...prev,
        service: preselectedService.name
      }));
    }
  }, [isEditMode, editingAppointment, preselectedService]);

  const resetForm = () => {
    setAppointmentData({
      petName: '',
      petType: '',
      service: preselectedService ? preselectedService.name : '',
      date: '',
      time: '',
      ownerName: '',
      phone: '',
      specialRequests: ''
    });
    setBookingStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const nextStep = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1);
  };

  const prevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1);
  };

  const handleConfirm = () => {
    if (isEditMode && onUpdateAppointment) {
      const updatedAppointment = {
        ...editingAppointment,
        ...appointmentData,
        status: 'confirmed'
      };
      onUpdateAppointment(updatedAppointment);
    } else if (onConfirmBooking) {
      const newAppointment = {
        id: Date.now(),
        ...appointmentData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      onConfirmBooking(newAppointment);
    }
    
    resetForm();
  };

  // Get selected service details for requirements display
  const selectedService = services.find(s => s.name === appointmentData.service);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-cyan-50 to-blue-50">
          <h3 className="text-2xl font-bold text-slate-900">
            {isEditMode ? 'Reschedule Appointment' : 'Book Your Appointment'}
          </h3>
          <button 
            className="p-2 hover:bg-white hover:bg-opacity-80 rounded-lg transition-colors focus-ring" 
            onClick={handleClose}
          >
            <X size={24} className="text-slate-700" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, label: "Pet & Service" },
              { step: 2, label: "Date & Time" },
              { step: 3, label: "Confirmation" }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  bookingStep >= item.step 
                    ? 'bg-gradient-primary text-white' 
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {item.step}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  bookingStep >= item.step ? 'text-cyan-700' : 'text-slate-600'
                }`}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className={`w-12 h-1 mx-4 rounded ${
                    bookingStep > item.step ? 'bg-gradient-primary' : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Pet Information & Service Selection */}
          {bookingStep === 1 && (
            <div>
              <h4 className="text-xl font-semibold mb-6 text-slate-800">Pet Information & Service Selection</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Pet Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Pet Name</label>
                    <input
                      type="text"
                      value={appointmentData.petName}
                      onChange={(e) => setAppointmentData({...appointmentData, petName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-slate-900"
                      placeholder="Your pet's name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Pet Type</label>
                    <select
                      value={appointmentData.petType}
                      onChange={(e) => setAppointmentData({...appointmentData, petType: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-slate-900"
                    >
                      <option value="">Select pet type</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="bird">Bird</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Service Needed</label>
                    <select
                      value={appointmentData.service}
                      onChange={(e) => setAppointmentData({...appointmentData, service: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-slate-900"
                      disabled={!!preselectedService}
                    >
                      <option value="">Select service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.name}>{service.name}</option>
                      ))}
                    </select>
                    {preselectedService && (
                      <p className="text-sm text-cyan-700 mt-2">
                        ✓ {preselectedService.name} pre-selected
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column - Service Details */}
                {selectedService && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <h5 className="font-semibold text-lg mb-4 flex items-center gap-3 text-slate-900">
                      <span className="text-2xl">{selectedService.icon}</span>
                      {selectedService.name}
                    </h5>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Price:</span>
                        <span className="font-semibold text-cyan-700">{selectedService.price}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Duration:</span>
                        <span className="font-semibold text-slate-900">{selectedService.duration}</span>
                      </div>
                    </div>
                    
                    {selectedService.requirements && (
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h6 className="font-semibold text-sm text-amber-900 mb-2">Pre-appointment Requirements:</h6>
                            <ul className="text-xs text-amber-800 space-y-1">
                              {selectedService.requirements.map((req, index) => (
                                <li key={index}>• {req}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {bookingStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={24} className="text-cyan-600" />
                <h4 className="text-xl font-semibold text-slate-800">Select Your Preferred Date & Time</h4>
              </div>
              
              <div className="space-y-4">
                {availableSlots.map((daySlot) => (
                  <div key={daySlot.date} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-lg font-semibold text-slate-900">{daySlot.day}, {daySlot.date}</h5>
                      {appointmentData.date === `${daySlot.day}, ${daySlot.date}` && (
                        <div className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                          Selected Day
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {daySlot.slots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setAppointmentData({
                            ...appointmentData, 
                            date: `${daySlot.day}, ${daySlot.date}`, 
                            time: time
                          })}
                          className={`p-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                            appointmentData.date === `${daySlot.day}, ${daySlot.date}` && 
                            appointmentData.time === time 
                              ? 'bg-gradient-primary text-white shadow-lg shadow-cyan-500/30' 
                              : 'bg-white border border-slate-300 text-slate-800 hover:border-cyan-500 hover:text-cyan-700'
                          }`}
                        >
                          <Clock size={14} />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {appointmentData.date && appointmentData.time && (
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-600" />
                  <div>
                    <strong className="text-emerald-900">Selected:</strong>
                    <span className="text-emerald-800 ml-2">{appointmentData.date} at {appointmentData.time}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact Information & Confirmation */}
          {bookingStep === 3 && (
            <div>
              <h4 className="text-xl font-semibold mb-6 text-slate-800">Contact Information & Final Details</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={appointmentData.ownerName}
                      onChange={(e) => setAppointmentData({...appointmentData, ownerName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-slate-900"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={appointmentData.phone}
                      onChange={(e) => setAppointmentData({...appointmentData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-slate-900"
                      placeholder="(613) 555-0123"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Special Requests or Notes 
                      <span className="text-slate-600 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      value={appointmentData.specialRequests}
                      onChange={(e) => setAppointmentData({...appointmentData, specialRequests: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-slate-900"
                      placeholder="Any specific concerns, previous treatments, or special instructions..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                {/* Appointment Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-slate-900 mb-4">
                    {isEditMode ? 'Updated Appointment Summary' : 'Appointment Summary'}
                  </h5>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Pet:</span>
                      <span className="text-slate-900">{appointmentData.petName} ({appointmentData.petType})</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Service:</span>
                      <span className="text-slate-900">{appointmentData.service}</span>
                    </div>
                    
                    {selectedService && (
                      <>
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-700">Price:</span>
                          <span className="text-cyan-700 font-semibold">{selectedService.price}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-700">Duration:</span>
                          <span className="text-slate-900">{selectedService.duration}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="border-t border-slate-300 my-3 pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-700">Date:</span>
                        <span className="text-slate-900">{appointmentData.date}</span>
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <span className="font-medium text-slate-700">Time:</span>
                        <span className="text-slate-900">{appointmentData.time}</span>
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <span className="font-medium text-slate-700">Owner:</span>
                        <span className="text-slate-900">{appointmentData.ownerName}</span>
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <span className="font-medium text-slate-700">Phone:</span>
                        <span className="text-slate-900">{appointmentData.phone}</span>
                      </div>
                    </div>
                  </div>

                  {selectedService?.requirements && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info size={16} className="text-blue-600 mt-0.5" />
                        <div>
                          <h6 className="font-semibold text-sm text-blue-900">Please Remember:</h6>
                          <p className="text-xs text-blue-800">Review the pre-appointment requirements for this service.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex justify-between items-center p-6 border-t border-slate-200 bg-slate-50">
          {bookingStep > 1 && (
            <button 
              onClick={prevStep} 
              className="px-6 py-3 border border-slate-300 text-slate-800 font-medium rounded-lg hover:bg-white hover:border-slate-400 transition-colors focus-ring"
            >
              Previous
            </button>
          )}
          
          <div className="ml-auto">
            {bookingStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={
                  (bookingStep === 1 && (!appointmentData.petName || !appointmentData.petType || !appointmentData.service)) ||
                  (bookingStep === 2 && (!appointmentData.date || !appointmentData.time))
                }
                className="px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus-ring"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={!appointmentData.ownerName || !appointmentData.phone}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus-ring"
              >
                {isEditMode ? 'Update Appointment' : 'Confirm Booking'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;