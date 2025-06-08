import React, { useState } from 'react';
import { Calendar, Clock, Phone, Mail, MapPin, Heart, Shield, Star, ChevronRight, User, PlusCircle, CheckCircle, Play, Award, Users } from 'lucide-react';

const VeterinaryWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    petName: '',
    petAge: '',
    petBreed: '',
    petType: '',
    petTemperament: '',
    service: '',
    date: '',
    time: '',
    ownerName: '',
    phone: '',
    email: '',
    firstVisit: false,
    extraTime: false,
    petStory: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const services = [
    {
      id: 'wellness',
      name: 'Wellness Check-ups',
      description: 'Comprehensive health examinations for your pet',
      price: '$75 - $95',
      newOwnerPrice: '$75',
      duration: '30-45 minutes',
      newOwnerDuration: '60 minutes',
      icon: '🏥',
      details: 'Complete physical examination, vaccination updates, health counseling, and preventive care recommendations. Perfect for new pet owners who want to establish a baseline for their pet\'s health.',
      included: [
        'Complete physical examination',
        'Vaccination assessment and updates',
        'Nutritional counseling',
        'Behavior and training guidance',
        'Preventive care planning',
        'Health record establishment'
      ]
    },
    {
      id: 'dental',
      name: 'Dental Cleaning',
      description: 'Professional dental care for healthier teeth and gums',
      price: '$245 - $320',
      duration: '2-3 hours',
      icon: '🦷',
      details: 'Full dental cleaning under anesthesia, dental X-rays, tooth extractions if needed. Pre-procedure blood work required for senior pets.',
      included: [
        'Pre-anesthetic blood work',
        'Full mouth dental X-rays',
        'Ultrasonic scaling and polishing',
        'Tooth extractions if necessary',
        'Post-procedure pain management'
      ]
    },
    {
      id: 'surgery',
      name: 'Surgical Services',
      description: 'Safe and professional surgical procedures',
      price: '$150 - $800',
      duration: '1-4 hours',
      icon: '⚕️',
      details: 'Spay/neuter, soft tissue surgery, orthopedic procedures with full anesthetic monitoring.',
      included: [
        'Pre-surgical consultation',
        'Full anesthetic monitoring',
        'Surgical procedure',
        'Post-operative care instructions',
        'Follow-up examination'
      ]
    },
    {
      id: 'emergency',
      name: 'Emergency Care',
      description: '24/7 emergency veterinary services',
      price: '$120 - $500',
      duration: 'Varies',
      icon: '🚨',
      details: 'Immediate care for urgent medical conditions, trauma, and after-hours emergencies.',
      included: [
        'Immediate triage assessment',
        'Emergency diagnostics',
        'Stabilization treatment',
        'Pain management',
        'Referral coordination if needed'
      ]
    }
  ];

  const testimonials = [
    {
      name: "Emma Thompson",
      petName: "Luna",
      text: "Dr. Smith helped me understand everything about my puppy's needs. As a first-time dog owner, I had so many questions, and they patiently answered every single one.",
      rating: 5
    },
    {
      name: "Michael Chen",
      petName: "Whiskers",
      text: "The team made my anxious rescue cat feel so comfortable. They took extra time to explain the vaccination schedule and what to expect as Whiskers settled into his new home.",
      rating: 5
    },
    {
      name: "Sarah Rodriguez",
      petName: "Buddy",
      text: "I was nervous about bringing Buddy for his first check-up, but the staff was incredibly welcoming. They even sent me a preparation guide beforehand!",
      rating: 5
    }
  ];

  const availableSlots = [
    { 
      date: '2024-06-05', 
      day: 'Wednesday', 
      slots: ['9:00 AM', '2:00 PM', '4:30 PM'],
      newOwnerSlots: ['9:00 AM (Extended)', '2:00 PM (Extended)']
    },
    { 
      date: '2024-06-06', 
      day: 'Thursday', 
      slots: ['10:00 AM', '1:00 PM', '3:00 PM'],
      newOwnerSlots: ['10:00 AM (Extended)', '1:00 PM (Extended)']
    },
    { 
      date: '2024-06-07', 
      day: 'Friday', 
      slots: ['9:30 AM', '11:00 AM', '2:30 PM'],
      newOwnerSlots: ['9:30 AM (Extended)', '2:30 PM (Extended)']
    }
  ];

  const handleBookAppointment = (service) => {
    setSelectedService(service);
    setAppointmentData({...appointmentData, service: service.name});
    setShowBookingForm(true);
    setBookingStep(1);
  };

  const nextStep = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
    }
  };

  const prevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const confirmBooking = () => {
    const appointmentType = appointmentData.firstVisit ? "New Pet Owner Consultation" : appointmentData.service;
    const duration = appointmentData.firstVisit || appointmentData.extraTime ? "60 minutes" : "30-45 minutes";
    
    alert(`Appointment confirmed!\n\n${appointmentData.petName} - ${appointmentType}\n${appointmentData.date} at ${appointmentData.time}\nDuration: ${duration}\n\nWe're excited to meet ${appointmentData.petName}!\n\nYou'll receive:\n• Confirmation email with preparation guide\n• Reminder call 24 hours before\n• New pet owner welcome packet`);
    
    setShowBookingForm(false);
    setBookingStep(1);
    setAppointmentData({
      petName: '',
      petAge: '',
      petBreed: '',
      petType: '',
      petTemperament: '',
      service: '',
      date: '',
      time: '',
      ownerName: '',
      phone: '',
      email: '',
      firstVisit: false,
      extraTime: false,
      petStory: ''
    });
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-4 text-amber-900">
                Veterinary Care
              </h1>
              <h2 className="text-3xl font-semibold mb-6 text-amber-800">
                For Your Beloved Pets
              </h2>
              <p className="text-xl mb-8 text-amber-700 leading-relaxed">
                Gentle, compassionate care for pets and peace of mind for their families. 
                We specialize in making first-time pet owners feel confident and supported.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-lg"
                >
                  Our Services <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setShowBookingForm(true)}
                  className="border-2 border-amber-600 text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-600 hover:text-white transition-colors shadow-lg"
                >
                  Book Your Visit
                </button>
              </div>
              
              {/* New Pet Owner Callout */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500">
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">New Pet Owner?</h3>
                    <p className="text-amber-700 mb-3">We understand the joy and concerns that come with your first pet. Our team provides extra guidance and support to help you both feel comfortable.</p>
                    <button 
                      onClick={() => setCurrentPage('new-owner')}
                      className="text-amber-600 font-semibold hover:text-amber-800 flex items-center gap-1"
                    >
                      Learn more about our new owner services <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-8 inline-block">
                <div className="text-8xl mb-4">🐕‍🦺</div>
                <p className="text-amber-700 font-medium">Gentle care for every pet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-900 mb-2">10K+</div>
              <div className="text-amber-700">Happy Clients</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-900 mb-2">15+</div>
              <div className="text-amber-700">Years Experience</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-900 mb-2">100%</div>
              <div className="text-amber-700">Expert Team</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-900 mb-2">24/7</div>
              <div className="text-amber-700">Care Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">What We Offer</h2>
            <p className="text-amber-700 text-lg font-medium">WHERE LOVE AND CARE MEET!</p>
            <p className="text-amber-600 mt-2 max-w-2xl mx-auto">
              Comprehensive veterinary services designed to keep your pets healthy and give you peace of mind.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-amber-100 hover:-translate-y-1">
                <div className="text-4xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2 text-center">{service.name}</h3>
                <p className="text-amber-700 mb-4 text-center text-sm">{service.description}</p>
                <div className="text-amber-600 font-bold mb-4 text-center text-lg">
                  {service.id === 'wellness' ? `Starting at ${service.newOwnerPrice}` : service.price}
                </div>
                <button 
                  onClick={() => handleBookAppointment(service)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-md"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">What Pet Parents Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-amber-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-amber-900 font-semibold">
                  {testimonial.name}
                  <div className="text-sm text-amber-600 font-normal">Pet parent to {testimonial.petName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Meet Dr. Anderson</h2>
            <p className="text-amber-700 text-lg">Your Pet's New Best Friend</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-amber-100 to-orange-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-amber-300 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                    👩‍⚕️
                  </div>
                  <button className="bg-white text-amber-700 px-6 py-2 rounded-full font-semibold hover:bg-amber-50 transition-colors flex items-center gap-2 mx-auto">
                    <Play className="w-4 h-4" />
                    Watch Video Introduction
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Dr. Sarah Anderson, DVM</h3>
                <p className="text-amber-700 mb-4">
                  "I believe every pet deserves gentle, compassionate care. As someone who has helped thousands of first-time pet owners, 
                  I understand the questions and concerns you might have."
                </p>
                <ul className="space-y-2 text-amber-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    15+ years in veterinary medicine
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Specializes in preventive care
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Expert in pet behavior guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Passionate about client education
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Ready to Give Your Pet the Best Care?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <Phone className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-lg">(613) 555-PAWS</p>
              <p className="text-sm text-amber-100 mt-2">Available 24/7 for emergencies</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <MapPin className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>123 Pet Care Lane<br />Ottawa, ON K1A 0A1</p>
              <p className="text-sm text-amber-100 mt-2">Easy parking available</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <Clock className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p>Mon-Fri: 8AM-7PM<br />Sat-Sun: 9AM-5PM</p>
              <p className="text-sm text-amber-100 mt-2">Extended hours for new clients</p>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-white text-amber-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg"
            >
              Schedule Your Pet's First Visit
            </button>
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
            onClick={() => setCurrentPage('home')}
            className="text-amber-600 hover:text-amber-800 mb-4 flex items-center gap-2 font-semibold"
          >
            ← Back to Home
          </button>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-amber-900 mb-4">Your Pet's First Wellness Visit</h1>
            <p className="text-amber-700 text-lg max-w-2xl mx-auto">
              Everything you need to know about your pet's first check-up. We'll guide you through every step.
            </p>
          </div>
        </div>

        {/* What to Expect Section */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">What to Expect During Your Visit</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Welcome & Check-in</h3>
              <p className="text-amber-700 text-sm">We'll greet you and your pet, complete paperwork, and answer any initial questions you might have.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Gentle Examination</h3>
              <p className="text-amber-700 text-sm">Dr. Anderson will perform a thorough but gentle examination, explaining each step to help you understand your pet's health.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Care Plan Discussion</h3>
              <p className="text-amber-700 text-sm">We'll create a personalized care plan and answer all your questions about nutrition, training, and future care.</p>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">🏥</div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">Puppy & Kitten Wellness</h2>
                <p className="text-amber-700">Comprehensive first visit designed for new pet owners</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-amber-900 mb-4">What's Included in Your Visit</h3>
              <div className="space-y-2">
                {services[0].included.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-amber-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 rounded-lg p-4">
                <span className="font-semibold text-amber-800 block mb-1">New Owner Price:</span>
                <div className="text-amber-600 font-bold text-2xl">$75</div>
                <div className="text-amber-600 text-sm">Extended 60-minute visit</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <span className="font-semibold text-amber-800 block mb-1">Duration:</span>
                <div className="text-amber-700 text-lg font-semibold">60 minutes</div>
                <div className="text-amber-600 text-sm">Extra time for questions</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-orange-800 mb-2">What to Bring</h4>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• Any previous medical records</li>
                <li>• Current food sample (if you have questions about nutrition)</li>
                <li>• List of questions or concerns</li>
                <li>• Your pet's favorite treat for positive reinforcement</li>
              </ul>
            </div>

            <button 
              onClick={() => handleBookAppointment(services[0])}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar size={20} />
              Schedule Your Pet's First Visit
            </button>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Questions You Might Have</h2>
            <div className="space-y-4">
              <div className="border-b border-amber-100 pb-4">
                <h3 className="font-semibold text-amber-900 mb-2">How should I prepare my pet for their first visit?</h3>
                <p className="text-amber-700 text-sm">Bring them hungry for treats, let them explore the carrier beforehand, and try to stay calm yourself - pets pick up on our emotions!</p>
              </div>
              <div className="border-b border-amber-100 pb-4">
                <h3 className="font-semibold text-amber-900 mb-2">What if my pet is anxious or scared?</h3>
                <p className="text-amber-700 text-sm">This is completely normal! We use fear-free techniques and can take breaks during the exam. Let us know about your pet's temperament when booking.</p>
              </div>
              <div className="border-b border-amber-100 pb-4">
                <h3 className="font-semibold text-amber-900 mb-2">How often should my pet visit?</h3>
                <p className="text-amber-700 text-sm">Puppies and kittens need more frequent visits initially. We'll create a personalized schedule based on your pet's age, breed, and health status.</p>
              </div>
              <div className="border-b border-amber-100 pb-4">
                <h3 className="font-semibold text-amber-900 mb-2">What vaccinations does my pet need?</h3>
                <p className="text-amber-700 text-sm">We'll assess your pet's risk factors and lifestyle to recommend the appropriate vaccination schedule. Core vaccines are essential, others depend on your pet's needs.</p>
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Can I stay with my pet during the examination?</h3>
                <p className="text-amber-700 text-sm">Absolutely! We encourage pet parents to stay present. It helps keep your pet calm and allows you to ask questions throughout the process.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">After You Book: What Happens Next</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Confirmation Email</h3>
              <p className="text-amber-700 text-sm">Immediate confirmation with appointment details and preparation guide</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Welcome Packet</h3>
              <p className="text-amber-700 text-sm">New pet owner resources and tips sent 2 days before your visit</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Reminder Call</h3>
              <p className="text-amber-700 text-sm">Friendly reminder 24 hours before with any last-minute questions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Your Visit</h3>
              <p className="text-amber-700 text-sm">Warm welcome and comprehensive care for you and your pet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingModal = () => {
    if (!showBookingForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-amber-900">Book Your Pet's Visit</h2>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-amber-600 hover:text-amber-800 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-100"
              >
                ×
              </button>
            </div>
            <div className="flex items-center mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    bookingStep >= step ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && <div className={`w-8 h-1 ${bookingStep > step ? 'bg-amber-600' : 'bg-amber-200'}`}></div>}
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-amber-700">
              {bookingStep === 1 && "Tell us about your pet"}
              {bookingStep === 2 && "Choose your service"}
              {bookingStep === 3 && "Select date & time"}
              {bookingStep === 4 && "Contact information"}
            </div>
          </div>

          <div className="p-6">
            {bookingStep === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-amber-900">Tell Us About Your Pet</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Pet's Name</label>
                    <input
                      type="text"
                      value={appointmentData.petName}
                      onChange={(e) => setAppointmentData({...appointmentData, petName: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="Your pet's name"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Pet Type</label>
                    <select
                      value={appointmentData.petType}
                      onChange={(e) => setAppointmentData({...appointmentData, petType: e.target.value})}
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
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Age</label>
                    <input
                      type="text"
                      value={appointmentData.petAge}
                      onChange={(e) => setAppointmentData({...appointmentData, petAge: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="e.g., 3 months, 2 years"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Breed (if known)</label>
                    <input
                      type="text"
                      value={appointmentData.petBreed}
                      onChange={(e) => setAppointmentData({...appointmentData, petBreed: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="Mixed breed is perfectly fine!"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-amber-800 font-semibold mb-2">Pet's Temperament</label>
                    <select
                      value={appointmentData.petTemperament}
                      onChange={(e) => setAppointmentData({...appointmentData, petTemperament: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    >
                      <option value="">How would you describe your pet?</option>
                      <option value="calm">Calm and relaxed</option>
                      <option value="energetic">Energetic and playful</option>
                      <option value="anxious">Anxious or nervous</option>
                      <option value="social">Very social and friendly</option>
                      <option value="shy">Shy or reserved</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={appointmentData.firstVisit}
                      onChange={(e) => setAppointmentData({...appointmentData, firstVisit: e.target.checked})}
                      className="w-5 h-5 text-amber-600"
                    />
                    <span className="text-amber-800 font-semibold">This is our first visit to any veterinarian</span>
                  </label>
                  {appointmentData.firstVisit && (
                    <div className="mt-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-amber-700 text-sm mb-2">
                        <strong>Welcome!</strong> We're excited to meet you and your pet. We'll take extra time to make sure you both feel comfortable.
                      </p>
                      <p className="text-amber-600 text-xs">✓ Extended 60-minute appointment automatically included</p>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-amber-800 font-semibold mb-2">Tell us about your pet (optional)</label>
                  <textarea
                    value={appointmentData.petStory}
                    onChange={(e) => setAppointmentData({...appointmentData, petStory: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    rows="3"
                    placeholder="Any concerns, questions, or things you'd like us to know about your pet?"
                  />
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-amber-900">Choose Your Service</h3>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        appointmentData.service === service.name 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-amber-200 hover:border-amber-300'
                      }`}
                      onClick={() => setAppointmentData({...appointmentData, service: service.name})}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{service.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-amber-900">{service.name}</h4>
                          <p className="text-amber-700 text-sm mb-2">{service.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-600 font-bold">
                              {service.id === 'wellness' && appointmentData.firstVisit 
                                ? `${service.newOwnerPrice} (New Pet Owner)` 
                                : service.price}
                            </span>
                            <span className="text-amber-600 text-sm">
                              {service.id === 'wellness' && (appointmentData.firstVisit || appointmentData.extraTime)
                                ? service.newOwnerDuration 
                                : service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {appointmentData.service === 'Wellness Check-ups' && !appointmentData.firstVisit && (
                  <div className="mt-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={appointmentData.extraTime}
                        onChange={(e) => setAppointmentData({...appointmentData, extraTime: e.target.checked})}
                        className="w-5 h-5 text-amber-600"
                      />
                      <span className="text-amber-800">I'd like extra time for questions (+$10, 60 minutes total)</span>
                    </label>
                  </div>
                )}
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-amber-900">Select Date & Time</h3>
                <div className="space-y-4">
                  {availableSlots.map((daySlot) => (
                    <div key={daySlot.date} className="border-2 border-amber-200 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50">
                      <h4 className="font-semibold text-amber-900 mb-3">{daySlot.day}, {daySlot.date}</h4>
                      
                      {(appointmentData.firstVisit || appointmentData.extraTime) && (
                        <div className="mb-3">
                          <h5 className="text-sm font-semibold text-amber-800 mb-2">Extended Appointments (60 minutes)</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {daySlot.newOwnerSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setAppointmentData({
                                  ...appointmentData, 
                                  date: `${daySlot.day}, ${daySlot.date}`, 
                                  time: time
                                })}
                                className={`py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                                  appointmentData.date === `${daySlot.day}, ${daySlot.date}` && appointmentData.time === time
                                    ? 'bg-amber-600 text-white border-amber-600'
                                    : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h5 className="text-sm font-semibold text-amber-800 mb-2">Standard Appointments (30-45 minutes)</h5>
                        <div className="grid grid-cols-3 gap-2">
                          {daySlot.slots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setAppointmentData({
                                ...appointmentData, 
                                date: `${daySlot.day}, ${daySlot.date}`, 
                                time: time
                              })}
                              className={`py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                                appointmentData.date === `${daySlot.day}, ${daySlot.date}` && appointmentData.time === time
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 4 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-amber-900">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      value={appointmentData.ownerName}
                      onChange={(e) => setAppointmentData({...appointmentData, ownerName: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={appointmentData.phone}
                      onChange={(e) => setAppointmentData({...appointmentData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="(613) 555-0123"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-amber-800 font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      value={appointmentData.email}
                      onChange={(e) => setAppointmentData({...appointmentData, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 mt-6 border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    We're Excited to Meet {appointmentData.petName}!
                  </h4>
                  <div className="text-amber-800 space-y-2">
                    <p><strong>Pet:</strong> {appointmentData.petName} ({appointmentData.petType}, {appointmentData.petAge})</p>
                    <p><strong>Service:</strong> {appointmentData.firstVisit ? "New Pet Owner Consultation" : appointmentData.service}</p>
                    <p><strong>Date & Time:</strong> {appointmentData.date} at {appointmentData.time}</p>
                    <p><strong>Duration:</strong> {appointmentData.firstVisit || appointmentData.extraTime ? "60 minutes" : "30-45 minutes"}</p>
                    {appointmentData.petTemperament && (
                      <p><strong>Temperament:</strong> {appointmentData.petTemperament}</p>
                    )}
                  </div>
                  
                  <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200">
                    <h5 className="font-semibold text-amber-900 mb-2">What happens next:</h5>
                    <ul className="text-amber-700 text-sm space-y-1">
                      <li>✓ Confirmation email with preparation guide</li>
                      <li>✓ New pet owner welcome packet (2 days before visit)</li>
                      <li>✓ Reminder call 24 hours before appointment</li>
                      <li>✓ Warm welcome and comprehensive care on your visit day</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {bookingStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors font-semibold"
                >
                  Previous
                </button>
              )}
              
              <div className="ml-auto">
                {bookingStep < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={
                      (bookingStep === 1 && (!appointmentData.petName || !appointmentData.petType)) ||
                      (bookingStep === 2 && !appointmentData.service) ||
                      (bookingStep === 3 && (!appointmentData.date || !appointmentData.time))
                    }
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed font-semibold shadow-lg"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={confirmBooking}
                    disabled={!appointmentData.ownerName || !appointmentData.phone || !appointmentData.email}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed font-semibold shadow-lg"
                  >
                    Confirm Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-amber-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold text-amber-800 cursor-pointer flex items-center gap-2"
            >
              🐾 Healthy Paws
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`font-semibold transition-colors ${currentPage === 'home' ? 'text-amber-600' : 'text-amber-700 hover:text-amber-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('services')}
                className={`font-semibold transition-colors ${currentPage === 'services' ? 'text-amber-600' : 'text-amber-700 hover:text-amber-600'}`}
              >
                Services
              </button>
              <button 
                onClick={() => setShowBookingForm(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'services' && <ServicesPage />}
      
      {/* Booking Modal */}
      <BookingModal />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              🐾 Healthy Paws Veterinary Clinic
            </div>
            <p className="text-amber-100 mb-6 text-lg">Compassionate care for your beloved pets</p>
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
              <p>© 2024 Healthy Paws Veterinary Clinic. Designed by [Your Names] for SEG3125 Assignment 2.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VeterinaryWebsite;