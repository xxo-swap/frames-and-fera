// app/inquiry/page.tsx
'use client';

import { useState, useId } from 'react';

interface InquiryFormState {
  clientNames: string;
  phone: string;
  eventDate: string;
  location: string;
  service: string;
  notes: string;
}

const INITIAL_STATE: InquiryFormState = {
  clientNames: '',
  phone: '',
  eventDate: '',
  location: '',
  service: '',
  notes: '',
};

const SERVICE_OPTIONS = [
  'Photography',
  'Wedding Film',
  'Photography & Wedding Film',
];

export default function InquiryPage() {
  const [formData, setFormData] = useState<InquiryFormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serviceError, setServiceError] = useState(false);
  const formId = useId();

  const handleServiceSelect = (option: string) => {
    setServiceError(false);
    setFormData((prev) => ({
      ...prev,
      service: prev.service === option ? '' : option,
    }));
  };

  const handleInvalid = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    message: string
  ) => {
    e.currentTarget.setCustomValidity(message);
  };

  const handleInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.setCustomValidity('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service) {
      setServiceError(true);
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send transmission');
      }

      setStatus('success');
      setFormData(INITIAL_STATE);
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <section className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-text/70">
                Bookings &amp; Commissions
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light leading-[0.95] tracking-tight">
                Let’s create something <span className="italic">enduring</span>.
              </h1>
              <p className="font-sans text-sm leading-relaxed text-brand-text/80 max-w-md pt-2">
                We take on a limited number of weddings and visual commissions each year to ensure uncompromising creative presence. Tell us your date, vision, and celebrations below.
              </p>
            </div>

            <aside className="space-y-8 border-t border-brand-accent pt-8">
              <div>
                <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
                  Headquarters
                </h2>
                <p className="mt-1 font-sans text-sm leading-relaxed text-brand-text/90">
                  Flat No-F6-G09, Centurion Park Terrace Home, Techzone-IV, Greater Noida West, Gautam Buddha Nagar, Uttar Pradesh 201306
                </p>
              </div>

              <div>
                <h2 className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
                  Direct Inquiries
                </h2>
                <a
                  href="mailto:hello@framesandfera.in"
                  className="mt-1 block font-serif text-lg underline underline-offset-4 decoration-brand-accent hover:opacity-70 transition-opacity"
                >
                  hello@framesandfera.in
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

          <section className="lg:col-span-7">
            {status === 'success' ? (
              <div className="border border-brand-accent p-12 text-center space-y-4">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-text/60">
                  Received
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl">Thank you for sharing your story.</h3>
                <p className="font-sans text-sm text-brand-text/80 max-w-sm mx-auto">
                  We review our calendar weekly and will be in touch with you directly on your phone/WhatsApp within two business days.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="font-sans text-xs uppercase tracking-[0.2em] border-b border-brand-text pb-1 hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
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
                    onInvalid={(e) => handleInvalid(e, 'Please tell us your name(s) to proceed.')}
                    onInput={handleInput}
                    placeholder="Simar & Vasu"
                    className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`${formId}-phone`}
                    className="block font-sans text-[11px] uppercase tracking-[0.25em]"
                  >
                    Phone / WhatsApp *
                  </label>
                  <input
                    id={`${formId}-phone`}
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onInvalid={(e) => handleInvalid(e, 'Please share your contact number so we can reach you.')}
                    onInput={handleInput}
                    placeholder="+91 98765 43210"
                    className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                  />
                </div>

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
                      onInvalid={(e) => handleInvalid(e, 'Please share your wedding date or tentative season.')}
                      onInput={handleInput}
                      placeholder="e.g., November 2026"
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
                      onInvalid={(e) => handleInvalid(e, 'Please enter your wedding venue or city.')}
                      onInput={handleInput}
                      placeholder="Zana Luxury Resort, Jim Corbett"
                      className="w-full border-b border-brand-accent bg-transparent pb-3 pt-1 text-base text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="block font-sans text-[11px] uppercase tracking-[0.25em]">
                      Service *
                    </span>
                    {serviceError && (
                      <span className="font-sans text-[10px] tracking-wider text-red-400">
                        Please select an intended service
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SERVICE_OPTIONS.map((option) => {
                      const isSelected = formData.service === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleServiceSelect(option)}
                          className={`flex items-center justify-between border px-4 py-3 text-left transition-all ${
                            isSelected
                              ? 'border-brand-text bg-brand-text text-brand-bg'
                              : serviceError
                              ? 'border-red-400/60 text-brand-text hover:border-brand-text'
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
                    placeholder="Share ceremony itineraries, venue details, or what matters most to your story..."
                    className="w-full border border-brand-accent bg-transparent p-3 text-sm text-brand-text placeholder-brand-text/30 focus:border-brand-text focus:outline-none transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="font-sans text-xs tracking-wider text-red-400">
                    Failed to dispatch your inquiry. Please try again or email us directly at hello@framesandfera.in.
                  </p>
                )}

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