'use client';

import { useState, useId } from 'react';
import Link from 'next/link';

interface InquiryFormState {
  clientNames: string;
  email: string;
  phone: string;
  eventDate: string;
  location: string;
  guestCount: string;
  budget: string;
  coverageType: string[];
  notes: string;
}

const INITIAL_STATE: InquiryFormState = {
  clientNames: '',
  email: '',
  phone: '',
  eventDate: '',
  location: '',
  guestCount: '',
  budget: '',
  coverageType: [],
  notes: '',
};

const COVERAGE_OPTIONS = [
  'Full Wedding Weekend',
  'Editorial Photography',
  'Cinematic Film (Super 8 / 4K)',
  'Creative Direction & Styling',
];

const BUDGET_TIERS = [
  '$10k – $15k',
  '$15k – $25k',
  '$25k – $40k',
  '$40k+',
];

export default function InquiryPage() {
  const [formData, setFormData] = useState<InquiryFormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formId = useId();

  const handleCoverageToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      coverageType: prev.coverageType.includes(option)
        ? prev.coverageType.filter((item) => item !== option)
        : [...prev.coverageType, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate endpoint call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Navigation Bar */}
        

        {/* Layout Grid */}
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Context & Editorial Copy */}
          <section className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-text/70">
                Bookings &amp; Commissions
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light leading-[0.95] tracking-tight">
                Let’s create something <span className="italic">enduring</span>.
              </h1>
              <p className="font-sans text-sm leading-relaxed text-brand-text/80 max-w-md pt-2">
                We take on a limited number of weddings and editorial commissions each year to ensure uncompromising creative presence. Tell us your date, vision, and scale below.
              </p>
            </div>

            <aside className="space-y-8 border-t border-brand-accent pt-8">
              <div>
                <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
                  Headquarters
                </h2>
                <p className="mt-1 font-serif text-lg">Paris — Milan — Worldwide</p>
              </div>

              <div>
                <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
                  Direct Inquiries
                </h2>
                <a
                  href="mailto:atelier@framesandfera.com"
                  className="mt-1 block font-serif text-lg underline underline-offset-4 decoration-brand-accent hover:opacity-70 transition-opacity"
                >
                  atelier@framesandfera.com
                </a>
              </div>

              <div>
                <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
                  Current Availability
                </h2>
                <p className="mt-1 font-sans text-xs tracking-wider text-brand-text/80">
                  Select dates remaining for 2026/2027.
                </p>
              </div>
            </aside>
          </section>

          {/* Right Column: Ingestion Form */}
          <section className="lg:col-span-7">
            {status === 'success' ? (
              <div className="border border-brand-accent p-12 text-center space-y-4">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-text/60">
                  Received
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl">Thank you for sharing your story.</h3>
                <p className="font-sans text-sm text-brand-text/80 max-w-sm mx-auto">
                  We review our calendar weekly and will be in touch within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Names */}
                <div className="space-y-2">
                  <label
                    htmlFor={`${formId}-names`}
                    className="block font-sans text-[11px] uppercase tracking-[0.25em]"
                  >
                    Client Name(s) *
                  </label>
                  <input
                    id={`${formId}-names`}
                    required
                    type="text"
                    value={formData.clientNames}
                    onChange={(e) => setFormData({ ...formData, clientNames: e.target.value })}
                    placeholder="Camille & Julian"
                    className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                  />
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label
                      htmlFor={`${formId}-email`}
                      className="block font-sans text-[11px] uppercase tracking-[0.25em]"
                    >
                      Email Address *
                    </label>
                    <input
                      id={`${formId}-email`}
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@example.com"
                      className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`${formId}-phone`}
                      className="block font-sans text-[11px] uppercase tracking-[0.25em]"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Event Logistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label
                      htmlFor={`${formId}-date`}
                      className="block font-sans text-[11px] uppercase tracking-[0.25em]"
                    >
                      Event Date or Target Season *
                    </label>
                    <input
                      id={`${formId}-date`}
                      required
                      type="text"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      placeholder="e.g., September 18, 2026"
                      className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`${formId}-location`}
                      className="block font-sans text-[11px] uppercase tracking-[0.25em]"
                    >
                      Location &amp; Venue *
                    </label>
                    <input
                      id={`${formId}-location`}
                      required
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Villa Balbiano, Lake Como"
                      className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Coverage Type Checks */}
                <div className="space-y-3 pt-2">
                  <span className="block font-sans text-[11px] uppercase tracking-[0.25em]">
                    Intended Coverage
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {COVERAGE_OPTIONS.map((option) => {
                      const isSelected = formData.coverageType.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleCoverageToggle(option)}
                          className={`flex items-center justify-between border px-4 py-3 text-left transition-all ${
                            isSelected
                              ? 'border-brand-text bg-brand-text text-brand-bg'
                              : 'border-brand-accent hover:border-brand-text text-brand-text'
                          }`}
                        >
                          <span className="font-sans text-xs tracking-wider">{option}</span>
                          <span className="text-xs">{isSelected ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-3">
                  <span className="block font-sans text-[11px] uppercase tracking-[0.25em]">
                    Anticipated Production Budget
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BUDGET_TIERS.map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        className={`border py-2.5 text-center transition-all ${
                          formData.budget === tier
                            ? 'border-brand-text bg-brand-text text-brand-bg'
                            : 'border-brand-accent hover:border-brand-text text-brand-text'
                        }`}
                      >
                        <span className="font-sans text-xs tracking-wider">{tier}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vision / Notes */}
                <div className="space-y-2">
                  <label
                    htmlFor={`${formId}-notes`}
                    className="block font-sans text-[11px] uppercase tracking-[0.25em]"
                  >
                    Vision, Aesthetic, or Narrative Notes
                  </label>
                  <textarea
                    id={`${formId}-notes`}
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Share mood boards, architectural details, or what mattered most to you..."
                    className="w-full border border-brand-accent bg-transparent p-3 text-sm text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-10 py-4 bg-brand-text text-brand-bg font-sans text-xs uppercase tracking-[0.25em] hover:bg-brand-text/85 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'submitting' ? 'Transmitting...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}