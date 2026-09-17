'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: '',
  });

  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calendar State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      if (value.trim() === '') {
        setEmailError('');
      } else if (!EMAIL_REGEX.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  };

  // Calendar Helpers
  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const formattedDate = selected.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setFormData((prev) => ({ ...prev, date: formattedDate }));
    setIsCalendarOpen(false);
  };

  // Generate calendar days
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const startDayIndex = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        clientNames: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventDate: formData.date,
        location: formData.location,
        service: 'Wedding Photography & Film',
        notes: formData.message,
      };

      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3d0bc] text-[#211102]">
      {/* 1. HERO SECTION */}
      <section className="w-full">
        <div className="relative w-full h-screen overflow-hidden">
          <Image
            src="/inquiry-hero.webp"
            alt="Frames and Fera Wedding"
            fill
            priority
            className="object-cover object-center filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#211102]/70 via-[#211102]/40 to-[#211102]/80 flex flex-col justify-center items-center text-center px-6">
            <span className="font-sans text-xs md:text-sm tracking-[0.4em] text-[#f3d0bc]/90 uppercase mb-3 drop-shadow">
              Enquiries
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f3d0bc] font-normal italic tracking-wide drop-shadow-lg max-w-4xl">
              Tell Us About Yourself
            </h1>
          </div>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        {submitted ? (
          <div className="text-center py-16 space-y-4 border border-[#211102]/20 p-8 rounded-sm bg-[#211102]/5">
            <h2 className="font-serif text-3xl md:text-4xl italic tracking-wide">
              Thank you for contacting us
            </h2>
            <p className="font-sans text-xs tracking-[0.25em] uppercase opacity-75 leading-relaxed">
              We have received your details and will get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-wide">
                Begin The Journey
              </h2>
              <p className="font-sans text-xs tracking-[0.25em] uppercase mt-3 opacity-75">
                We accept a limited number of celebrations each season
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 font-sans">
              {/* Name */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60">
                      Email 
                    </label>
                    {emailError && (
                      <span className="text-[10px] text-red-700 tracking-wider font-medium">
                        {emailError}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-3 text-sm placeholder-[#211102]/40 focus:outline-none transition duration-300 ${
                      emailError
                        ? 'border-red-700 text-red-900 focus:border-red-700'
                        : 'border-[#211102]/30 focus:border-[#211102]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
                  />
                </div>
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Custom Clean Calendar Date Field */}
                <div className="relative" ref={calendarRef}>
                  <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                    Event Date
                  </label>
                  <div
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm cursor-pointer flex justify-between items-center select-none"
                  >
                    <span className={formData.date ? 'text-[#211102]' : 'text-[#211102]/40'}>
                      {formData.date || 'Select your date'}
                    </span>
                    <svg
                      className="w-4 h-4 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  {/* Calendar Popover */}
                  {isCalendarOpen && (
                    <div className="absolute top-full left-0 z-50 mt-2 p-5 bg-[#faf5f0] border border-[#211102]/20 shadow-xl rounded-sm w-72 text-[#211102]">
                      {/* Header Controls */}
                      <div className="flex justify-between items-center mb-4">
                        <button
                          type="button"
                          onClick={() => changeMonth(-1)}
                          className="p-1 hover:opacity-50 transition"
                        >
                          &#8592;
                        </button>
                        <span className="font-serif text-sm font-medium tracking-wide">
                          {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeMonth(1)}
                          className="p-1 hover:opacity-50 transition"
                        >
                          &#8594;
                        </button>
                      </div>

                      {/* Weekday Labels */}
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <span key={d} className="text-[10px] uppercase tracking-wider opacity-50">
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Day Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {Array.from({ length: startDayIndex }).map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const currentDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                          const isPast =
                            currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={isPast}
                              onClick={() => handleSelectDay(day)}
                              className={`h-8 w-8 flex items-center justify-center rounded-full transition text-[11px] ${
                                isPast
                                  ? 'opacity-20 cursor-not-allowed'
                                  : 'hover:bg-[#211102] hover:text-[#f3d0bc] cursor-pointer'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                    City / Venue
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase opacity-60 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#211102]/30 py-3 text-sm placeholder-[#211102]/40 focus:outline-none focus:border-[#211102] transition duration-300 resize-none"
                />
              </div>

              {/* Error Message */}
              {errorMsg && (
                <p className="text-red-700 text-xs tracking-wider uppercase text-center font-medium">
                  {errorMsg}
                </p>
              )}

              {/* Submit CTA */}
              <div className="pt-6 text-center">
                <button
                  type="submit"
                  disabled={loading || Boolean(emailError)}
                  className="px-12 py-4 border border-[#211102] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#211102] hover:text-[#f3d0bc] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  );
}