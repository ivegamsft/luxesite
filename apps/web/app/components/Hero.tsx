'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ─── Custom Dropdown ─────────────────────────────────────────────── */

interface LuxeOption {
  value: string;
  label: string;
}

interface LuxeSelectProps {
  label: string;
  placeholder: string;
  options: LuxeOption[];
  value: string;
  onChange: (value: string) => void;
  /** Adds a right border divider on md+ */
  divider?: boolean;
}

function LuxeSelect({ label, placeholder, options, value, onChange, divider }: LuxeSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Scroll active option into view
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const items = listRef.current?.children;
    if (items?.[activeIndex]) {
      (items[activeIndex] as HTMLElement).scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, open]);

  const openMenu = useCallback(() => {
    setOpen(true);
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [options, value]);

  const select = useCallback(
    (val: string) => {
      onChange(val);
      setOpen(false);
      buttonRef.current?.focus();
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!open) {
            openMenu();
          } else {
            setActiveIndex((i) => Math.min(i + 1, options.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (open) setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!open) {
            openMenu();
          } else if (activeIndex >= 0) {
            select(options[activeIndex].value);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
          break;
        case 'Home':
          if (open) { e.preventDefault(); setActiveIndex(0); }
          break;
        case 'End':
          if (open) { e.preventDefault(); setActiveIndex(options.length - 1); }
          break;
      }
    },
    [open, activeIndex, options, openMenu, select],
  );

  const listId = `luxe-listbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      ref={containerRef}
      className={`relative w-full md:flex-1 ${divider ? 'border-b md:border-b-0 md:border-r border-aurora-border' : ''}`}
    >
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={label}
        aria-activedescendant={open && activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`
          flex items-center justify-between w-full
          bg-transparent text-sm font-medium pr-3 py-2 cursor-pointer
          transition-colors duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-gold/60 focus-visible:ring-offset-1 focus-visible:rounded
          ${value ? 'text-aurora-text' : 'text-aurora-text-muted'}
        `}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`ml-2 w-3.5 h-3.5 text-aurora-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4.5l3 3 3-3" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="
              absolute left-0 right-0 top-full mt-1.5 z-50
              bg-aurora-bg-light border border-aurora-border rounded-lg
              shadow-subtle overflow-hidden
              py-1 max-h-60 overflow-y-auto
            "
          >
            {options.map((opt, i) => (
              <li
                key={opt.value}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={opt.value === value}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault(); // keep focus on button
                  select(opt.value);
                }}
                className={`
                  px-3.5 py-2.5 text-sm cursor-pointer
                  transition-colors duration-100 select-none
                  ${opt.value === value
                    ? 'text-aurora-gold font-semibold bg-aurora-gold/8'
                    : 'text-aurora-text font-medium'
                  }
                  ${i === activeIndex ? 'bg-aurora-bg-dark' : ''}
                `}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Option Data ─────────────────────────────────────────────────── */

const DESTINATIONS: LuxeOption[] = [
  { value: 'maldives', label: 'Maldives' },
  { value: 'santorini', label: 'Santorini' },
  { value: 'kyoto', label: 'Kyoto' },
  { value: 'patagonia', label: 'Patagonia' },
  { value: 'safari', label: 'East Africa Safari' },
  { value: 'other', label: 'Somewhere else' },
];

const TIMINGS: LuxeOption[] = [
  { value: 'next-month', label: 'Next month' },
  { value: '3-months', label: 'In 2–3 months' },
  { value: '6-months', label: 'In 4–6 months' },
  { value: 'next-year', label: 'Next year' },
  { value: 'flexible', label: "I'm flexible" },
];

/* ─── Hero ────────────────────────────────────────────────────────── */

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedDest, setSelectedDest] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');

  const handleRequestConsultation = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      if (selectedDest || selectedTiming) {
        window.dispatchEvent(
          new CustomEvent('hero-discovery', {
            detail: { destination: selectedDest, timing: selectedTiming },
          })
        );
      }
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreDestinations = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start lg:pl-12 xl:pl-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-aurora-navy">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&h=1400&fit=crop"
          alt="Luxury beach paradise"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark overlay for hero text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-aurora-navy/80 via-aurora-navy/50 to-transparent" />

      <motion.div 
        className="relative z-20 max-w-5xl px-4 sm:px-6 lg:px-8 text-left lg:max-w-[50%]"
      >
        {/* Headline */}
        <motion.h1 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="font-heading text-fluid-3xl font-bold text-white mb-6 tracking-tight leading-[1.08]"
        >
          Journeys Written in Light
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-fluid-lg text-white/80 max-w-[55ch] mb-10 leading-relaxed"
        >
          Private shores. Unmarked airstrips. Tables that don&apos;t take reservations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <button
            onClick={handleRequestConsultation}
            className="w-full sm:w-auto bg-aurora-gold text-white font-semibold px-8 py-4 rounded-lg hover:bg-aurora-gold/85 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-navy min-h-[44px]"
          >
            Request Consultation
          </button>
          <button
            onClick={handleExploreDestinations}
            className="w-full sm:w-auto border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-lg hover:border-aurora-gold hover:text-aurora-gold hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-navy min-h-[44px]"
          >
            Explore Destinations
          </button>
        </motion.div>

        {/* Concierge Discovery Row — stacked on mobile, inline on md+ */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-8 bg-aurora-bg-light border border-aurora-border shadow-subtle rounded-lg px-4 py-3"
        >
          <LuxeSelect
            label="Destination"
            placeholder="Where to?"
            options={DESTINATIONS}
            value={selectedDest}
            onChange={setSelectedDest}
            divider
          />
          <LuxeSelect
            label="Travel timing"
            placeholder="When?"
            options={TIMINGS}
            value={selectedTiming}
            onChange={setSelectedTiming}
            divider
          />
          <button
            onClick={handleRequestConsultation}
            className="whitespace-nowrap text-sm font-semibold text-aurora-gold hover:text-aurora-gold/85 transition-colors py-2 px-3 focus:outline-none focus:underline min-h-[44px]"
          >
            Discuss with a specialist →
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-scroll-hint">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
