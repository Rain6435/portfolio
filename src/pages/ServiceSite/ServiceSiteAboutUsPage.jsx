import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Heart, Shield, Star, Award, Users, Clock } from "lucide-react";
import { useServiceSite } from "./ServiceSiteWrapper";
import "./ServiceSite.css"; // Adjust the path to your logo image

const ServiceSiteAboutUsPage = () => {
  const navigate = useNavigate();
  useServiceSite();

  const teamMembers = [
    {
      name: "Dr. Sarah Anderson",
      title: "Lead Veterinarian",
      experience: "15+ years",
      specialization: "Small Animal Medicine & Surgery",
      education: "DVM from University of Guelph",
      description:
        "Passionate about preventive care and building lasting relationships with pets and their families.",
      image: import.meta.env.BASE_URL+"doctor-1.png", // Adjust path as needed
    },
    {
      name: "Dr. Michael Chen",
      title: "Emergency Veterinarian",
      experience: "10+ years",
      specialization: "Emergency & Critical Care",
      education: "DVM from Atlantic Veterinary College",
      description:
        "Dedicated to providing compassionate emergency care when your pet needs it most.",
      image: import.meta.env.BASE_URL+"doctor-2.png", // Adjust path as needed
    },
    {
      name: "Jennifer Martinez",
      title: "Senior Veterinary Technician",
      experience: "12+ years",
      specialization: "Dental Care & Anesthesia",
      education: "RVT from Ridgetown College",
      description:
        "Expert in dental procedures and ensuring the comfort and safety of every patient.",
      image: import.meta.env.BASE_URL+"doctor-3.png", // Adjust path as needed
      },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassionate Care",
      description:
        "We treat every pet as if they were our own, with genuine love and attention to their individual needs.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Expert Medical Care",
      description:
        "Our team stays current with the latest veterinary advances to provide the highest quality medical care.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Personalized Service",
      description:
        "We take time to understand each pet's unique personality and health needs for tailored care plans.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family-Centered Approach",
      description:
        "We believe in educating and supporting pet families to ensure the best possible outcomes.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Pets Cared For" },
    { number: "15+", label: "Years of Service" },
    { number: "5,000+", label: "Happy Families" },
    { number: "24/7", label: "Emergency Care" },
  ];

  const handleNavigateToServices = () => {
    navigate({ to: "/projects/service-site/services" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 lg:px-9">
        <h1 className="text-4xl lg:text-6xl font-bold text-gradient-primary mb-6">
          About PetFam Veterinary
        </h1>

        <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-12 max-w-4xl">
          Where love and care meet professional excellence. We've been serving
          the Ottawa community for over 15 years, building lasting relationships
          with pets and their families.
        </p>

        {/* Our Story Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 mb-12 shadow-lg border border-cyan-100">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient-primary text-center mb-8">
            Our Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="w-full h-80 bg-gradient-primary rounded-2xl flex items-center justify-center text-6xl lg:text-8xl text-white shadow-xl shadow-cyan-500/20">
              <img
                className="rounded-2xl"
                src={`${import.meta.env.BASE_URL}logo.png`}
              />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded in 2009, PetFam Veterinary began with a simple mission:
                to provide exceptional veterinary care in a warm, welcoming
                environment where pets and their families feel truly valued.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                What started as a small neighborhood clinic has grown into a
                full-service veterinary hospital, but we've never lost sight of
                our core values: compassionate care, medical excellence, and
                treating every pet like family.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Today, we're proud to have served over 10,000 pets and their
                families, building lasting relationships that span generations
                of beloved companions.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient-primary text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-cyan-100 text-center hover-lift transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl flex items-center justify-center text-cyan-600 mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient-primary text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-cyan-100 hover-lift transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl text-white mx-auto mb-6 shadow-lg shadow-cyan-500/30">
                  <img
                    src={member.image} // Adjust path as needed
                    alt={member.name}
                    className="rounded w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-lg font-semibold text-gradient-primary text-center mb-6">
                  {member.title}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700 text-sm">
                      Experience:
                    </span>
                    <span className="text-slate-600 text-sm">
                      {member.experience}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700 text-sm">
                      Specialization:
                    </span>
                    <span className="text-slate-600 text-sm text-right">
                      {member.specialization}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700 text-sm">
                      Education:
                    </span>
                    <span className="text-slate-600 text-sm text-right">
                      {member.education}
                    </span>
                  </div>
                </div>
                <p className="text-base text-slate-600 leading-relaxed text-center italic">
                  "{member.description}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 lg:p-12 mb-12 border border-cyan-100">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient-primary text-center mb-8">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-cyan-100 hover-lift transition-all duration-300"
              >
                <div className="text-3xl lg:text-5xl font-bold text-gradient-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-base lg:text-lg text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 text-center shadow-lg border border-cyan-100">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
            Ready to Join Our Family?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            We'd love to meet you and your pet! Schedule your first appointment
            today and experience the PetFam difference.
          </p>
          <button
            onClick={handleNavigateToServices}
            className="bg-gradient-primary text-white font-semibold text-xl px-10 py-5 rounded-2xl shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 hover:-translate-y-2 transition-all duration-300 focus-ring"
          >
            Schedule Your Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSiteAboutUsPage;
