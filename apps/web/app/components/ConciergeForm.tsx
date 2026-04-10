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
  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState(false);
  const [prefillBanner, setPrefillBanner] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});
  const [tierIndicator, setTierIndicator] = useState('');

  // Listen for tier selections
  useEffect(() => {
    const handleTierSelection = (e: Event) => {
      const { tier } = (e as CustomEvent).detail as { tier: string };
      
      const tierBudgetMap: Record<string, string> = {
        'Silver': '$5,000 – $10,000',
        'Black': '$25,000 – $50,000',
        'Obsidian': '$100,000+',
      };
      setFormData((prev) => ({
        ...prev,
        notes: `Interested in ${tier} membership — please include tier details in our consultation.`,
        budget: tierBudgetMap[tier] || prev.budget,
      }));
      
      setPrefillBanner(true);
      setTierIndicator(tier);
      setShowDetails(true);
    };

    window.addEventListener('tier-selected', handleTierSelection);
    return () => window.removeEventListener('tier-selected', handleTierSelection);
  }, []);

  // Listen for hero discovery row selections
  useEffect(() => {
    const handleHeroDiscovery = (e: Event) => {
      const { destination, timing } = (e as CustomEvent).detail as {
        destination: string;
        timing: string;
      };

      const destLabels: Record<string, string> = {
        maldives: 'Maldives',
        santorini: 'Santorini',
        kyoto: 'Kyoto',
        patagonia: 'Patagonia',
        safari: 'East Africa Safari',
        other: 'Somewhere else',
      };

      const timingLabels: Record<string, string> = {
        'next-month': 'Next month',
        '3-months': 'In 2–3 months',
        '6-months': 'In 4–6 months',
        'next-year': 'Next year',
        flexible: "I'm flexible",
      };

      setFormData((prev) => {
        const parts: string[] = [];
        if (destination) parts.push(`Interested in: ${destLabels[destination] ?? destination}`);
        if (timing) parts.push(`Timing: ${timingLabels[timing] ?? timing}`);
        const prefillText = parts.join(' · ');

        const interestMap: Record<string, string[]> = {
          maldives: ['Beach & Islands'],
          santorini: ['Beach & Islands', 'City & Culture'],
          kyoto: ['City & Culture'],
          patagonia: ['Adventure'],
          safari: ['Wildlife & Safari'],
        };

        const mappedInterests = destination ? (interestMap[destination] ?? []) : [];
        const mergedInterests = Array.from(new Set([...prev.interests, ...mappedInterests]));

        return {
          ...prev,
          travelDates: timing ? (timingLabels[timing] ?? prev.travelDates) : prev.travelDates,
          interests: mergedInterests,
          notes: prev.notes ? prev.notes : prefillText,
        };
      });

      setPrefillBanner(true);
      setShowDetails(true);
    };

    window.addEventListener('hero-discovery', handleHeroDiscovery);
    return () => window.removeEventListener('hero-discovery', handleHeroDiscovery);
  }, []);

  // Auto-dismiss prefill banner
  useEffect(() => {
    if (!prefillBanner) return;
    const timer = setTimeout(() => setPrefillBanner(false), 5000);
    return () => clearTimeout(timer);
  }, [prefillBanner]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(false), 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Clear error banner when all errors are resolved
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setShowErrorBanner(false);
    }
  }, [errors]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "We'll need your name to personalize your consultation";
    }

    if (!formData.email.trim()) {
      newErrors.email = "We'll send trip ideas to your email";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "That doesn't look like a valid email — please double-check";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (field: string) => {
    const newErrors = { ...errors };
    const newValidFields = { ...validFields };
    
    if (field === 'name') {
      if (!formData.name.trim()) {
        newErrors.name = "We'll need your name to personalize your consultation";
        newValidFields.name = false;
      } else {
        delete newErrors.name;
        newValidFields.name = true;
      }
    }
    if (field === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = "We'll send trip ideas to your email";
        newValidFields.email = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "That doesn't look like a valid email — please double-check";
        newValidFields.email = false;
      } else {
        delete newErrors.email;
        newValidFields.email = true;
      }
    }
    setErrors(newErrors);
    setValidFields(newValidFields);
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
      setShowErrorBanner(false);
      setValidFields({});
    } else {
      setShowErrorBanner(true);
      // Scroll to first error field
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstErrorField as HTMLElement).focus();
      }
    }
  };

  const inputClass =
    'w-full bg-white border border-aurora-border rounded-lg px-4 py-3 text-aurora-text focus:border-aurora-gold focus:ring-2 focus:ring-aurora-gold/50 focus:outline-none transition-all min-h-[44px]';

  return (
    <section id="contact" className="py-section-lg px-4 sm:px-6 bg-aurora-bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header — warm, conversational */}
        <AnimatedSection>
          <div className="mb-12">
            <p className="text-fluid-lg text-aurora-text-muted max-w-[50ch] leading-relaxed">
              Tell us where you dream of going.{' '}
              <span className="text-aurora-text font-heading font-medium">We&rsquo;ll handle every detail from&nbsp;here.</span>
            </p>
            <h2 className="sr-only">Request a Consultation</h2>
          </div>
        </AnimatedSection>

        {/* Process Steps */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-start gap-4 sm:gap-0 sm:items-center justify-between">
              {[
                { step: '1', label: 'Share your vision', desc: 'Tell us where and when' },
                { step: '2', label: 'Meet your specialist', desc: 'Matched within 24 hours' },
                { step: '3', label: 'Receive your itinerary', desc: 'Bespoke, down to every detail' },
              ].map((item, i) => (
                <div key={item.step} className="flex flex-col items-center text-center flex-1">
                  <div className="w-10 h-10 rounded-full border-2 border-aurora-gold/40 flex items-center justify-center text-aurora-gold font-heading font-semibold text-sm mb-2">
                    {item.step}
                  </div>
                  <p className="text-sm font-heading font-medium text-aurora-text">{item.label}</p>
                  <p className="text-xs text-aurora-text-muted mt-0.5">{item.desc}</p>
                  {i < 2 && (
                    <div className="hidden sm:block absolute" style={{ display: 'none' }} />
                  )}
                </div>
              ))}
            </div>
            {/* Connecting line behind steps */}
            <div className="hidden sm:block relative -mt-[72px] mx-16 mb-[72px]">
              <div className="h-px bg-aurora-border" />
            </div>
          </div>
        </AnimatedSection>

        {/* Form Container */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto bg-white border border-aurora-border rounded-lg p-5 sm:p-6 md:p-8 shadow-subtle">
          {/* Trust Badge */}
          <p className="text-sm text-aurora-text-muted text-center mb-6">
            ✓ 4.9/5 on Trustpilot · 1,200+ families trust Aurora Luxe
          </p>

          {/* Prefill Banner */}
          {prefillBanner && (
            <div
              role="status"
              className="mb-6 flex items-center gap-2 rounded-lg border border-aurora-gold/30 bg-aurora-gold/10 px-4 py-3 text-sm text-aurora-gold"
            >
              <span className="shrink-0">✦</span>
              {tierIndicator 
                ? `${tierIndicator} tier selected — we've added this to your notes below.`
                : "We've pre-filled some details from your selection above."}
            </div>
          )}

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
            {/* Error Banner */}
            {showErrorBanner && (
              <div role="alert" className="mb-6 flex items-center gap-2 rounded-lg border border-aurora-error/30 bg-aurora-error/10 px-4 py-3 text-sm text-aurora-error">
                <span className="shrink-0">⚠</span>
                Please complete the highlighted fields below.
              </div>
            )}
            {/* Screen reader error announcements */}
            <div aria-live="polite" className="sr-only">
              {Object.values(errors).length > 0 && (
                <p>{Object.values(errors).join('. ')}.</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Name *{validFields.name && <span className="text-aurora-success ml-1">✓</span>}
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
                Email *{validFields.email && <span className="text-aurora-success ml-1">✓</span>}
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

            {/* Notes — brief */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-aurora-text/80 mb-2">
                Tell us about your dream journey
              </label>
              <textarea
                id="notes"
                rows={3}
                maxLength={NOTES_MAX_LENGTH}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-aurora-border rounded-lg px-4 py-3 text-aurora-text placeholder:text-aurora-text-muted focus:border-aurora-gold focus:ring-2 focus:ring-aurora-gold/50 focus:outline-none transition-all resize-none"
                placeholder="Where would you like to go? Any special occasions or preferences?"
              />
            </div>

            {/* Expandable details */}
            <div>
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-sm text-aurora-gold hover:text-aurora-gold/80 transition-colors font-medium"
              >
                <svg className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {showDetails ? 'Fewer details' : 'Share more details (optional)'}
              </button>

              {showDetails && (
                <div className="mt-4 space-y-5 pt-4 border-t border-aurora-border/50">
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
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => {
                        const isSelected = formData.interests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            aria-pressed={isSelected}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all min-h-[36px] ${
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
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-aurora-gold text-white font-heading font-semibold py-4 rounded-lg cursor-pointer hover:shadow-lift hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-bg min-h-[44px]"
            >
              Request Consultation
            </button>

            <p className="text-xs text-aurora-text-muted text-center">
              Your details are held in strict confidence and never shared with third parties.
            </p>
          </form>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
