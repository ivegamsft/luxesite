'use client';

import { useState, FormEvent } from 'react';
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

export default function ConciergeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelDates: '',
    travelers: 2,
    interests: [] as string[],
    budget: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-section-lg px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12">
            <h2 className="text-fluid-2xl font-heading font-semibold tracking-tight leading-tight mb-4 text-aurora-white">
              Design Your Journey
            </h2>
            <p className="text-fluid-base text-aurora-white/50 max-w-[65ch]">
              One conversation. Then we take it from here.
            </p>
          </div>
        </AnimatedSection>

        {/* Form Container */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto bg-aurora-glass backdrop-blur-glass border border-aurora-glass-border rounded-sm p-6 md:p-8 shadow-glass">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="text-5xl mb-4">✦</div>
              <h3 className="font-heading text-fluid-xl font-semibold text-aurora-white">
                Thank you, {formData.name.split(' ')[0]}.
              </h3>
              <p className="text-fluid-base text-aurora-white/70 max-w-[50ch] mx-auto leading-relaxed">
                A dedicated curator will reach out within 24 hours to begin shaping your journey. Your information is held in absolute confidence.
              </p>
              <div className="h-px bg-gradient-aurora opacity-30 max-w-xs mx-auto"></div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', travelDates: '', travelers: 2, interests: [], budget: '', notes: '' });
                  setErrors({});
                }}
                className="text-sm text-aurora-white/50 hover:text-aurora-white/80 transition-colors underline underline-offset-4"
              >
                Submit another request
              </button>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Screen reader error announcements */}
            <div aria-live="polite" className="sr-only">
              {Object.values(errors).length > 0 && (
                <p>{Object.values(errors).join('. ')}.</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-aurora-white/80 mb-2">
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
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lg px-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" className="mt-1 text-sm text-aurora-error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-aurora-white/80 mb-2">
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
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lg px-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-aurora-error">{errors.email}</p>}
            </div>

            {/* Travel Dates */}
            <div>
              <label htmlFor="travelDates" className="block text-sm font-medium text-aurora-white/80 mb-2">
                Travel Dates
              </label>
              <input
                type="text"
                id="travelDates"
                placeholder="e.g., March 2025"
                value={formData.travelDates}
                onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lg px-4 py-3 text-aurora-white placeholder:text-aurora-white/40 focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
              />
            </div>

            {/* Number of Travelers */}
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-aurora-white/80 mb-2">
                Number of Travelers
              </label>
              <input
                type="number"
                id="travelers"
                min="1"
                max="20"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lg px-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-aurora-white/80 mb-3">
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
                          ? 'bg-gradient-aurora text-aurora-dark shadow-glow'
                          : 'bg-aurora-glass border border-aurora-glass-border text-aurora-white/80 hover:border-aurora-cyan/50'
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
              <label htmlFor="budget" className="block text-sm font-medium text-aurora-white/80 mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-[oklch(0.15_0.015_50)] border border-aurora-glass-border rounded-lg px-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px] [&>option]:bg-[oklch(0.15_0.015_50)] [&>option]:text-[oklch(0.95_0.012_85)]"
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
              <label htmlFor="notes" className="block text-sm font-medium text-aurora-white/80 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lg px-4 py-3 text-aurora-white placeholder:text-aurora-white/40 focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all resize-none"
                placeholder="Tell us about your dream journey..."
              />
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-aurora-white/40 text-center">
              Your details are held in strict confidence and never shared with third parties.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-aurora text-aurora-white font-heading font-semibold py-4 rounded-lg cursor-pointer hover:shadow-glow hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan focus:ring-offset-2 focus:ring-offset-aurora-dark min-h-[44px]"
            >
              Send My Request
            </button>
          </form>
          )}
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
