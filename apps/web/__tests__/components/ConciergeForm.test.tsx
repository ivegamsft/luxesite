import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConciergeForm from '@/app/components/ConciergeForm';

describe('ConciergeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders core form fields', () => {
    render(<ConciergeForm />);
    
    // Core visible fields (name, email, notes)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us about your dream event/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty required fields', async () => {
    render(<ConciergeForm />);
    
    const submitButton = screen.getByText('Request Consultation');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      // Errors appear both inline and in aria-live region; use getAllByText
      const nameErrors = screen.getAllByText(/we'll need your name/i);
      const emailErrors = screen.getAllByText(/we'll send event details/i);
      expect(nameErrors.length).toBeGreaterThanOrEqual(1);
      expect(emailErrors.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('rejects invalid email format', () => {
    render(<ConciergeForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    // Fill name but use invalid email
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText('Request Consultation');
    fireEvent.click(submitButton);
    
    // Success toast should NOT appear with invalid email
    expect(screen.queryByText(/Request received/)).not.toBeInTheDocument();
  });

  it('expandable details reveal additional fields', () => {
    render(<ConciergeForm />);
    
    // Click to expand details
    const expandButton = screen.getByText(/share more details/i);
    fireEvent.click(expandButton);
    
    // Now interest chips should be visible
    expect(screen.getByText('Children\'s Parties')).toBeInTheDocument();
  });

  it('interest chips toggle on click', () => {
    render(<ConciergeForm />);
    
    // Expand details first
    const expandButton = screen.getByText(/share more details/i);
    fireEvent.click(expandButton);
    
    const chip = screen.getByText('Children\'s Parties');
    
    // Click to select
    fireEvent.click(chip);
    expect(chip).toBeInTheDocument();
    
    // Click again to deselect
    fireEvent.click(chip);
    expect(chip).toBeInTheDocument();
  });

  it('successful submission shows success toast', async () => {
    render(<ConciergeForm />);
    
    // Fill in required fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByText('Request Consultation');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Request received/)).toBeInTheDocument();
      expect(screen.getByText(/specialist will be in touch/i)).toBeInTheDocument();
    });
  });

  it('successful submission resets form fields', async () => {
    render(<ConciergeForm />);
    
    // Fill in fields
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByText('Request Consultation');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Request received/)).toBeInTheDocument();
    });

    // Form should be reset
    await waitFor(() => {
      const resetNameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const resetEmailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(resetNameInput.value).toBe('');
      expect(resetEmailInput.value).toBe('');
    });
  });

  // --- Accessibility tests (verifying Trinity's a11y fixes) ---

  describe('Accessibility', () => {
    it('aria-invalid is set on inputs when validation fails', async () => {
      render(<ConciergeForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);

      // Before submission, aria-invalid should be false
      expect(nameInput).toHaveAttribute('aria-invalid', 'false');
      expect(emailInput).toHaveAttribute('aria-invalid', 'false');

      // Submit empty form to trigger validation
      fireEvent.click(screen.getByText('Request Consultation'));

      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('validation errors have unique IDs', async () => {
      render(<ConciergeForm />);

      fireEvent.click(screen.getByText('Request Consultation'));

      await waitFor(() => {
        const nameErrors = screen.getAllByText(/we'll need your name/i);
        const emailErrors = screen.getAllByText(/we'll send event details/i);

        // Get the inline error elements (the ones with IDs)
        const nameError = nameErrors.find(el => el.hasAttribute('id'))!;
        const emailError = emailErrors.find(el => el.hasAttribute('id'))!;

        expect(nameError).toHaveAttribute('id');
        expect(emailError).toHaveAttribute('id');
        // IDs must be distinct
        expect(nameError.getAttribute('id')).not.toBe(emailError.getAttribute('id'));
      });
    });

    it('invalid inputs have aria-describedby pointing to their error message', async () => {
      render(<ConciergeForm />);

      fireEvent.click(screen.getByText('Request Consultation'));

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/name/i);
        const nameErrors = screen.getAllByText(/we'll need your name/i);
        const nameError = nameErrors.find(el => el.hasAttribute('id'))!;

        expect(nameError).toHaveAttribute('id');
        expect(nameInput).toHaveAttribute('aria-describedby', nameError.getAttribute('id'));
      });
    });

    it('aria-live region exists for error announcements', () => {
      render(<ConciergeForm />);

      const liveRegion = document.querySelector('[aria-live]');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });

    it('interest toggle buttons have aria-pressed', () => {
      render(<ConciergeForm />);

      // Expand details to see interest chips
      const expandButton = screen.getByText(/share more details/i);
      fireEvent.click(expandButton);

      const chip = screen.getByText('Children\'s Parties');
      expect(chip).toHaveAttribute('aria-pressed', 'false');

      fireEvent.click(chip);
      expect(chip).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
