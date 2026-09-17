'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-[#f3d0bc] text-[#211102]">
      {/* ========================================================
          1. IMAGES SECTION
          (Hero image followed by an editorial 2-image teaser gallery)
      ======================================================== */}
      <section className="w-full">
        {/* Main Cover / Hero Image */}
        <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
          <Image
            src="/inquiry-hero.webp" // Replace with your image path
            alt="Frames and Fera Wedding"
            fill
            priority
            className="object-cover object-center filter brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211102]/60 via-transparent to-transparent flex flex-col justify-end items-center pb-12 text-center px-4">
            <span className="font-sans text-xs tracking-[0.35em] text-[#f3d0bc] uppercase mb-2">
              Inquiries &amp; Commissions
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#f3d0bc] font-normal italic tracking-wide">
              Let&apos;s Create Something Timeless
            </h1>
          </div>
        </div>

        {/* Editorial Supporting Images */}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-72 md:h-96 w-full overflow-hidden">
            <Image
              src="/inquiry-hero.webp" // Replace with your image path
              alt="Intimate wedding moment"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative h-72 md:h-96 w-full overflow-hidden">
            <Image
              src="/inquiry-hero.webp" // Replace with your image path
              alt="Editorial portrait"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MINIMAL, CLUTTER-FREE FORM
      ======================================================== */}
      <section className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl  font-normal tracking-wide">
            Tell Us Your Story
          </h2>
          <p className="font-sans text-xs tracking-[0.25em] uppercase mt-3 opacity-75">
            We accept a limited number of celebrations each season
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 font-sans">
          {/* Couple's Names */}
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
              Your Names
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
              />
            </div>
          </div>

          {/* Event Dates & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                Event Date(s)
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                City / Venue
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
              />
            </div>
          </div>

          {/* Vision Message */}
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
              Additional Notes
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border border-brand-primary/30  text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300 resize-none"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-6 text-center">
            <button
              type="submit"
              className="px-12 py-4 border border-[#211102] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#211102] hover:text-[#f3d0bc] transition-all duration-300"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </section>

      {/* ========================================================
          3. STUDIO ADDRESS & CONTACT DETAILS
      ======================================================== */}
      <section className="border-t border-[#211102]/20 py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Studio Location */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl ">Based In</h3>
            <p className="font-sans text-xs tracking-widest uppercase opacity-75 leading-relaxed">
              Delhi NCR
            </p>
          </div>

          {/* Direct Communication */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl">Direct Inquiries</h3>
            <p className="font-sans text-xs tracking-widest uppercase opacity-75 leading-relaxed">
              +91 74089 13971
              <br />
              contact@framesandfera.com
              <br />
              Mon &ndash; Sat &bull; 10:00 to 19:00
            </p>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl italic">Commissions</h3>
            <p className="font-sans text-xs tracking-widest uppercase opacity-75 leading-relaxed">
              Available for Destination Weddings
              <br />
              Across India &amp; Worldwide
              <br />
              By Prior Appointment Only
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}