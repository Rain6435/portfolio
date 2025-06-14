import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Heart,
  Shield,
  Star,
  ChevronRight,
  User,
  PlusCircle,
} from "lucide-react";

const VeterinaryWebsite2 = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    petName: "",
    petType: "",
    service: "",
    date: "",
    time: "",
    ownerName: "",
    phone: "",
  });

  const services = [
    {
      id: "wellness",
      name: "Wellness Check-ups",
      description: "Comprehensive health examinations for your pet",
      price: "$65 - $95",
      duration: "30-45 minutes",
      icon: "🏥",
      details:
        "Complete physical examination, vaccination updates, health counseling, and preventive care recommendations.",
    },
    {
      id: "dental",
      name: "Dental Cleaning",
      description: "Professional dental care for healthier teeth and gums",
      price: "$245 - $320",
      duration: "2-3 hours",
      icon: "🦷",
      details:
        "Full dental cleaning under anesthesia, dental X-rays, tooth extractions if needed. Pre-procedure blood work required for senior pets.",
    },
    {
      id: "surgery",
      name: "Surgical Services",
      description: "Safe and professional surgical procedures",
      price: "$150 - $800",
      duration: "1-4 hours",
      icon: "⚕️",
      details:
        "Spay/neuter, soft tissue surgery, orthopedic procedures with full anesthetic monitoring.",
    },
    {
      id: "emergency",
      name: "Emergency Care",
      description: "24/7 emergency veterinary services",
      price: "$120 - $500",
      duration: "Varies",
      icon: "🚨",
      details:
        "Immediate care for urgent medical conditions, trauma, and after-hours emergencies.",
    },
  ];

  const availableSlots = [
    {
      date: "2024-06-05",
      day: "Wednesday",
      slots: ["9:00 AM", "2:00 PM", "4:30 PM"],
    },
    {
      date: "2024-06-06",
      day: "Thursday",
      slots: ["10:00 AM", "1:00 PM", "3:00 PM"],
    },
    {
      date: "2024-06-07",
      day: "Friday",
      slots: ["9:30 AM", "11:00 AM", "2:30 PM"],
    },
  ];

  const handleBookAppointment = (service) => {
    setSelectedService(service);
    setAppointmentData({ ...appointmentData, service: service.name });
    setCurrentPage("booking");
  };

  const confirmBooking = () => {
    alert(
      `Appointment confirmed!\n\n${appointmentData.petName} - ${appointmentData.service}\n${appointmentData.date} at ${appointmentData.time}\n\nConfirmation email sent to your registered address.`
    );
    setCurrentPage("home");
    setAppointmentData({
      petName: "",
      petType: "",
      service: "",
      date: "",
      time: "",
      ownerName: "",
      phone: "",
    });
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-4 text-amber-900">
              Veterinary
            </h1>
            <h2 className="text-3xl font-semibold mb-8 text-amber-800">
              For your beloved pets
            </h2>
            <p className="text-xl mb-8 text-amber-700 max-w-2xl mx-auto">
              Pets bring joy, comfort, and companionship into our lives. Proper
              care, love, and attention ensure they live happy, healthy lives by
              our side.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentPage("services")}
                className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                Our Services <ChevronRight size={20} />
              </button>
              <button
                onClick={() => setCurrentPage("booking")}
                className="border-2 border-amber-600 text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-600 hover:text-white transition-colors shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <div className="text-8xl">🐕</div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              What We Offer
            </h2>
            <p className="text-amber-700 text-lg font-medium">
              WHERE LOVE AND CARE MEET!
            </p>
            <p className="text-amber-600 mt-2 max-w-2xl mx-auto">
              Explore our range of specialized pet care offerings designed to
              keep your furry friends healthy and happy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-amber-100 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2 text-center">
                  {service.name}
                </h3>
                <p className="text-amber-700 mb-4 text-center text-sm">
                  {service.description}
                </p>
                <div className="text-amber-600 font-bold mb-4 text-center text-lg">
                  {service.price}
                </div>
                <button
                  onClick={() => handleBookAppointment(service)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-md"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-700">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10K</div>
              <div className="text-amber-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7K</div>
              <div className="text-amber-100">Pets Treated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">96K</div>
              <div className="text-amber-100">Procedures</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-amber-100">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">
            Why Choose Healthy Paws?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-amber-900">
                Compassionate Care
              </h3>
              <p className="text-amber-700">
                We treat every pet as if they were our own, with love and
                dedication that shows in everything we do.
              </p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-amber-900">
                Expert Team
              </h3>
              <p className="text-amber-700">
                Experienced veterinarians and support staff committed to
                providing the highest quality care.
              </p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-amber-900">
                Modern Facility
              </h3>
              <p className="text-amber-700">
                State-of-the-art equipment and comfortable environment designed
                with your pets' comfort in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <Phone className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-lg">(613) 555-PAWS</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <MapPin className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>
                123 Pet Care Lane
                <br />
                Ottawa, ON K1A 0A1
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <Clock className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p>
                Mon-Fri: 8AM-7PM
                <br />
                Sat-Sun: 9AM-5PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ServicesPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-amber-600 hover:text-amber-800 mb-4 flex items-center gap-2 font-semibold"
          >
            ← Back to Home
          </button>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-amber-900 mb-4">
              Our Services
            </h1>
            <p className="text-amber-700 text-lg">
              Comprehensive veterinary care for your beloved pets
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-amber-100"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{service.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-amber-900 mb-2">
                    {service.name}
                  </h2>
                  <p className="text-amber-700 mb-4">{service.description}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 mb-6 border border-amber-100">
                <h3 className="font-semibold text-amber-900 mb-3">
                  Service Details
                </h3>
                <p className="text-amber-700 mb-4">{service.details}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-amber-800">Price:</span>
                    <div className="text-amber-600 font-bold text-lg">
                      {service.price}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">
                      Duration:
                    </span>
                    <div className="text-amber-700">{service.duration}</div>
                  </div>
                </div>
              </div>

              {service.id === "dental" && (
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    Pre-Procedure Requirements
                  </h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• 12-hour fasting required</li>
                    <li>• Blood work required for pets over 7 years</li>
                    <li>• Current vaccinations must be up to date</li>
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleBookAppointment(service)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar size={20} />
                Schedule {service.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-amber-600 hover:text-amber-800 mb-4 flex items-center gap-2 font-semibold"
          >
            ← Back to Home
          </button>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-amber-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-amber-700 text-lg max-w-2xl mx-auto">
              Complete the form below to schedule your pet's visit. We'll
              confirm your appointment shortly.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1: Pet & Service Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h2 className="text-2xl font-semibold text-amber-900">
                Pet & Service Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-amber-800 font-semibold mb-2">
                  Pet Name
                </label>
                <input
                  type="text"
                  value={appointmentData.petName}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      petName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  placeholder="Your pet's name"
                />
              </div>
              <div>
                <label className="block text-amber-800 font-semibold mb-2">
                  Pet Type
                </label>
                <select
                  value={appointmentData.petType}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      petType: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                >
                  <option value="">Select pet type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="bird">Bird</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-amber-800 font-semibold mb-2">
                  Service
                </label>
                <select
                  value={appointmentData.service}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      service: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                >
                  <option value="">Select service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Date & Time Selection */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h2 className="text-2xl font-semibold text-blue-900">
                Select Date & Time
              </h2>
            </div>

            <div className="space-y-6">
              {availableSlots.map((daySlot) => (
                <div
                  key={daySlot.date}
                  className="border-2 border-blue-200 rounded-xl p-6 bg-white"
                >
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    {daySlot.day}, {daySlot.date}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {daySlot.slots.map((time) => (
                      <button
                        key={time}
                        onClick={() =>
                          setAppointmentData({
                            ...appointmentData,
                            date: `${daySlot.day}, ${daySlot.date}`,
                            time: time,
                          })
                        }
                        className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                          appointmentData.date ===
                            `${daySlot.day}, ${daySlot.date}` &&
                          appointmentData.time === time
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Contact Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h2 className="text-2xl font-semibold text-green-900">
                Contact Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-800 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={appointmentData.ownerName}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      ownerName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-green-800 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={appointmentData.phone}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="(613) 555-0123"
                />
              </div>
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-amber-200">
            <h3 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center gap-2">
              <Heart className="w-8 h-8" />
              Appointment Summary
            </h3>

            {appointmentData.petName &&
            appointmentData.service &&
            appointmentData.date &&
            appointmentData.time ? (
              <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm">
                <div className="text-amber-800 space-y-3">
                  <p className="text-lg">
                    <strong>Pet:</strong> {appointmentData.petName} (
                    {appointmentData.petType})
                  </p>
                  <p className="text-lg">
                    <strong>Service:</strong> {appointmentData.service}
                  </p>
                  <p className="text-lg">
                    <strong>Date & Time:</strong> {appointmentData.date} at{" "}
                    {appointmentData.time}
                  </p>
                  {appointmentData.ownerName && (
                    <p className="text-lg">
                      <strong>Owner:</strong> {appointmentData.ownerName}
                    </p>
                  )}
                  {appointmentData.phone && (
                    <p className="text-lg">
                      <strong>Phone:</strong> {appointmentData.phone}
                    </p>
                  )}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Next Steps:
                  </h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Confirmation email will be sent</li>
                    <li>• We'll call to confirm 24 hours before</li>
                    <li>• Bring any previous medical records</li>
                    <li>• Arrive 15 minutes early for check-in</li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-amber-600 italic text-lg">
                Complete the sections above to see your appointment summary
              </p>
            )}
          </div>

          {/* Confirm Button */}
          <div className="text-center pb-8">
            <button
              onClick={confirmBooking}
              disabled={
                !appointmentData.petName ||
                !appointmentData.petType ||
                !appointmentData.service ||
                !appointmentData.date ||
                !appointmentData.time ||
                !appointmentData.ownerName ||
                !appointmentData.phone
              }
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed font-bold text-xl shadow-lg"
            >
              {appointmentData.petName &&
              appointmentData.service &&
              appointmentData.date &&
              appointmentData.time &&
              appointmentData.ownerName &&
              appointmentData.phone
                ? `Confirm Appointment for ${appointmentData.petName}`
                : "Complete All Sections to Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-amber-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              onClick={() => setCurrentPage("home")}
              className="text-2xl font-bold text-amber-800 cursor-pointer flex items-center gap-2"
            >
              🐾 Healthy Paws
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => setCurrentPage("home")}
                className={`font-semibold transition-colors ${
                  currentPage === "home"
                    ? "text-amber-600"
                    : "text-amber-700 hover:text-amber-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("services")}
                className={`font-semibold transition-colors ${
                  currentPage === "services"
                    ? "text-amber-600"
                    : "text-amber-700 hover:text-amber-600"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setCurrentPage("booking")}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === "home" && <HomePage />}
      {currentPage === "services" && <ServicesPage />}
      {currentPage === "booking" && <BookingPage />}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              🐾 Healthy Paws Veterinary Clinic
            </div>
            <p className="text-amber-100 mb-6 text-lg">
              Compassionate care for your beloved pets
            </p>
            <div className="flex justify-center space-x-8 text-sm mb-8">
              <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
                <Phone size={16} />
                (613) 555-PAWS
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
                <Mail size={16} />
                info@healthypaws.com
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
                <MapPin size={16} />
                123 Pet Care Lane, Ottawa
              </div>
            </div>
            <div className="pt-6 border-t border-amber-700 text-amber-200 text-sm">
              <p>
                © 2024 Healthy Paws Veterinary Clinic. Designed by [Your Names]
                for SEG3125 Assignment 2.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VeterinaryWebsite2;
