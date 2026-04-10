'use client';

import { useState, useEffect, FormEvent } from 'react';
import AnimatedSection from './AnimatedSection';

const interestOptions = [
  'Beach & Islands',
  'City & Culture',
  'Adventure',
  'Gastronomy',
  'Wellness & Spa',
  'Winter Sports',
  'Wildlife & Safari',
  'Yacht & Sailing'
];

const budgetRanges = [
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+'
];

const NOTES_MAX_LENGTH = 500;

const initialFormData = {
  name: '',
  email: '',
  travelDates: '',
  travelers: 2,
  interests: [] as string[],
  budget: '',
  notes: ''
};

export default function ConciergeForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(false), 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (field: string) => {
    const newErrors = { ...errors };
    if (field === 'name') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else {
        delete newErrors.name;
      }
    }
    if (field === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }
    setErrors(newErrors);
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setToast(true);
      setFormData({ ...initialFormData, interests: [] });
      setErrors({});
    }
  };

  const inputClass =
    'w-full bg-white border border-aurora-border rounded-lg px-4 py-3 text-aurora-text focus:border-aurora-gold focus:ring-2 focus:ring-aurora-gold/50 focus:outline-none transition-all min-h-[44px]';

  return (
    <section id="contact" className="py-section-lg px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12">
            <h2 className="text-fluid-2xl font-heading font-semibold tracking-tight leading-tight mb-4 text-aurora-text">
              Ready to Start Planning?
            </h2>
            <p className="text-fluid-base text-aurora-text-muted max-w-[65ch]">
              A specialist will reach out within 24 hours to discuss your vision.
            </p>
          </div>
        </AnimatedSection>

        {/* Form Container */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto bg-aurora-bg border border-aurora-border rounded-lg p-5 sm:p-6 md:p-8 shadow-subtle">
          {/* Trust Badge */}
          <p className="text-sm text-aurora-text-muted text-center mb-6">
            ✓ 4.9/5 on Trustpilot · 1,000+ journeys designed
          </p>

          {/* Success Toast */}
          {toast && (
            <div
              role="status"
              className="mb-6 flex items-center gap-2 rounded-lg border border-aurora-success/30 bg-aurora-success/10 px-4 py-3 text-sm text-aurora-success"
            >
              <span className="shrink-0">✓</span>
              Request received! A specialist will be in touch within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Screen reader error announcements */}
            <div aria-live="polite" className="sr-only">
              {Object.values(errors).length > 0 && (
                <p>{Object.values(errors).join('. ')}.</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors((prev) => { const next = { ...prev }; delete next.name; return next; });
                }}
                onBlur={() => validateField('name')}
                className={inputClass}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" className="mt-1 text-sm text-aurora-error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors((prev) => { const next = { ...prev }; delete next.email; return next; });
                }}
                onBlur={() => validateField('email')}
                className={inputClass}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-aurora-error">{errors.email}</p>}
            </div>

            {/* Travel Dates */}
            <div>
              <label htmlFor="travelDates" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Travel Dates
              </label>
              <input
                type="text"
                id="travelDates"
                placeholder="e.g., March 2025"
                value={formData.travelDates}
                onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                className={`${inputClass} placeholder:text-aurora-text-muted`}
              />
            </div>

            {/* Number of Travelers */}
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Number of Travelers
              </label>
              <input
                type="number"
                id="travelers"
                min="1"
                max="20"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                className={inputClass}
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-aurora-text/80 mb-3">
                Interests
              </label>
              <div className="flex flex-wrap gap-3">
                {interestOptions.map((interest) => {
                  const isSelected = formData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      aria-pressed={isSelected}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                        isSelected
                          ? 'bg-aurora-gold text-white shadow-medium'
                          : 'bg-white border border-aurora-border text-aurora-text-muted hover:border-aurora-gold/50'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className={`${inputClass} [&>option]:bg-white [&>option]:text-aurora-text`}
              >
                <option value="">Select a range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                maxLength={NOTES_MAX_LENGTH}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-aurora-border rounded-lg px-4 py-3 text-aurora-text placeholder:text-aurora-text-muted focus:border-aurora-gold focus:ring-2 focus:ring-aurora-gold/50 focus:outline-none transition-all resize-none"
                placeholder="Tell us about your dream journey..."
              />
              <p className="mt-1 text-xs text-aurora-text-muted text-right">
                {formData.notes.length}/{NOTES_MAX_LENGTH}
              </p>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-aurora-text-muted text-center">
              Your details are held in strict confidence and never shared with third parties.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-aurora-gold text-white font-heading font-semibold py-4 rounded-lg cursor-pointer hover:shadow-lift hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-bg min-h-[44px]"
            >
              Request Consultation
            </button>
          </form>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
