import React, { useState } from 'react';
import Navigation from './Navigation';
import HomePage from './HomePage';
import ServicesPage from './ServicesPage';
import AppointmentsPage from './AppointmentsPage';
import AboutUsPage from './AboutUsPage';
import BookingModal from './BookingModal';
import './ServiceSite.css';

const ServiceSite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const services = [
    {
      id: 'wellness',
      name: 'Wellness Check-ups',
      description: 'Comprehensive health examinations',
      price: '$65 - $95',
      duration: '30-45 minutes',
      icon: '🏥',
      details: 'Complete physical examination, vaccination updates, health counseling, and preventive care recommendations.',
      procedures: ['Physical examination', 'Vaccination assessment', 'Health consultation', 'Preventive care planning']
    },
    {
      id: 'dental',
      name: 'Dental Cleaning',
      description: 'Professional dental care for healthier teeth',
      price: '$245 - $320',
      duration: '2-3 hours',
      icon: '🦷',
      details: 'Full dental cleaning under anesthesia, dental X-rays, tooth extractions if needed. Pre-procedure blood work required for senior pets.',
      procedures: ['Pre-anesthetic blood work', 'Dental X-rays', 'Ultrasonic scaling', 'Polishing', 'Extractions if needed'],
      requirements: ['12-hour fasting required', 'Blood work for pets over 7 years', 'Current vaccinations required']
    },
    {
      id: 'surgery',
      name: 'Surgical Services',
      description: 'Safe and professional procedures',
      price: '$150 - $800',
      duration: '1-4 hours',
      icon: '⚕️',
      details: 'Spay/neuter, soft tissue surgery, orthopedic procedures with full anesthetic monitoring.',
      procedures: ['Pre-surgical consultation', 'Anesthetic monitoring', 'Surgical procedure', 'Post-operative care']
    },
    {
      id: 'emergency',
      name: 'Emergency Care',
      description: '24/7 emergency services',
      price: '$120 - $500',
      duration: 'Varies',
      icon: '🚨',
      details: 'Immediate care for urgent medical conditions, trauma, and after-hours emergencies.',
      procedures: ['Immediate assessment', 'Emergency diagnostics', 'Stabilization', 'Pain management']
    }
  ];

  const availableSlots = [
    { date: '2024-06-05', day: 'Wednesday', slots: ['9:00 AM', '2:00 PM', '4:30 PM'] },
    { date: '2024-06-06', day: 'Thursday', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
    { date: '2024-06-07', day: 'Friday', slots: ['9:30 AM', '11:00 AM', '2:30 PM'] }
  ];

  const handleBookAppointment = (service) => {
    setSelectedService(service);
    setIsEditMode(false);
    setEditingAppointment(null);
    setShowBookingForm(true);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setSelectedService(null);
    setIsEditMode(true);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
    setShowBookingForm(false);
    setSelectedService(null);
    setIsEditMode(false);
    setEditingAppointment(null);
    
    alert(`Appointment confirmed!\n\n${newAppointment.petName} - ${newAppointment.service}\n${newAppointment.date} at ${newAppointment.time}\n\nConfirmation details have been saved.`);
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    setAppointments(appointments.map(apt => 
      apt.id === updatedAppointment.id ? updatedAppointment : apt
    ));
    setShowBookingForm(false);
    setSelectedService(null);
    setIsEditMode(false);
    setEditingAppointment(null);
    
    alert(`Appointment updated!\n\n${updatedAppointment.petName} - ${updatedAppointment.service}\n${updatedAppointment.date} at ${updatedAppointment.time}\n\nYour changes have been saved.`);
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setSelectedService(null);
    setIsEditMode(false);
    setEditingAppointment(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" data-theme="petfam">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && (
        <HomePage 
          setCurrentPage={setCurrentPage}
          handleBookAppointment={handleBookAppointment}
          services={services}
        />
      )}
      
      {currentPage === 'services' && (
        <ServicesPage 
          setCurrentPage={setCurrentPage}
          handleBookAppointment={handleBookAppointment}
          services={services}
        />
      )}
      
      {currentPage === 'appointments' && (
        <AppointmentsPage 
          setCurrentPage={setCurrentPage}
          appointments={appointments}
          setAppointments={setAppointments}
          services={services}
          availableSlots={availableSlots}
          onEditAppointment={handleEditAppointment}
        />
      )}
      
      {currentPage === 'about' && (
        <AboutUsPage 
          setCurrentPage={setCurrentPage}
        />
      )}
      
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

export default ServiceSite;