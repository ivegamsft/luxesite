'use client';

import { useState, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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
  '€5,000 – €10,000',
  '€10,000 – €25,000',
  '€25,000 – €50,000',
  '€50,000 – €100,000',
  '€100,000+'
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
      toast.success('Request received — our concierge team will reach out within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        travelDates: '',
        travelers: 2,
        interests: [],
        budget: '',
        notes: ''
      });
      setErrors({});
    }
  };

  return (
    <section id="contact" className="py-section-lg px-4 sm:px-6">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'oklch(0.95 0.01 85 / 0.1)',
            color: 'oklch(0.95 0.005 85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid oklch(0.95 0.01 85 / 0.2)',
          },
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12">
            <h2 className="text-fluid-3xl font-heading font-bold mb-4 text-aurora-white">
              Design Your Journey
            </h2>
            <p className="text-fluid-base text-aurora-white/50">
              One conversation. Then we take it from here.
            </p>
          </div>
        </AnimatedSection>

        {/* Form Container */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto bg-aurora-glass backdrop-blur-glass border border-aurora-glass-border rounded-sm p-6 md:p-8 shadow-glass">
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lgpx-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lgpx-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
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
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lgpx-4 py-3 text-aurora-white placeholder:text-aurora-white/40 focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
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
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lgpx-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
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
                className="w-full bg-aurora-glass border border-aurora-glass-border rounded-lgpx-4 py-3 text-aurora-white focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all min-h-[44px]"
              >
                <option value="" className="bg-aurora-dark">Select a range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range} className="bg-aurora-dark">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-aurora text-aurora-dark font-heading font-semibold py-4 rounded-lg hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan min-h-[44px]"
            >
              Send Request
            </button>
          </form>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
