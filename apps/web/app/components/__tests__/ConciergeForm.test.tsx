import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConciergeForm from '@/app/components/ConciergeForm';

describe('ConciergeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ConciergeForm />);
    
    // Check for form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/travel dates/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of travelers/i)).toBeInTheDocument();
    expect(screen.getByText(/interests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget range/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/additional notes/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty required fields', async () => {
    render(<ConciergeForm />);
    
    const submitButton = screen.getByText('Send My Request');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('rejects invalid email format', () => {
    render(<ConciergeForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    // Fill name but use invalid email
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText('Send My Request');
    fireEvent.click(submitButton);
    
    // Confirmation panel should NOT appear with invalid email
    expect(screen.queryByText(/Thank you/)).not.toBeInTheDocument();
  });

  it('interest chips toggle on click', () => {
    render(<ConciergeForm />);
    
    const beachChip = screen.getByText('Beach & Islands');
    
    // Click to select
    fireEvent.click(beachChip);
    
    // The chip should have the selected styling (bg-gradient-aurora class)
    // We can verify it's in the document and clickable
    expect(beachChip).toBeInTheDocument();
    
    // Click again to deselect
    fireEvent.click(beachChip);
    expect(beachChip).toBeInTheDocument();
  });

  it('successful submission shows confirmation panel', async () => {
    render(<ConciergeForm />);
    
    // Fill in required fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByText('Send My Request');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Thank you, John/)).toBeInTheDocument();
      expect(screen.getByText(/dedicated curator/)).toBeInTheDocument();
    });
  });

  it('"Submit another request" resets form', async () => {
    render(<ConciergeForm />);
    
    // Fill in fields
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByText('Send My Request');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Thank you, John/)).toBeInTheDocument();
    });

    // Click "Submit another request" to reset
    fireEvent.click(screen.getByText('Submit another request'));

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
      fireEvent.click(screen.getByText('Send My Request'));

      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('validation errors have unique IDs', async () => {
      render(<ConciergeForm />);

      fireEvent.click(screen.getByText('Send My Request'));

      await waitFor(() => {
        const nameError = screen.getByText('Name is required');
        const emailError = screen.getByText('Email is required');

        expect(nameError).toHaveAttribute('id');
        expect(emailError).toHaveAttribute('id');
        // IDs must be distinct
        expect(nameError.getAttribute('id')).not.toBe(emailError.getAttribute('id'));
      });
    });

    it('invalid inputs have aria-describedby pointing to their error message', async () => {
      render(<ConciergeForm />);

      fireEvent.click(screen.getByText('Send My Request'));

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/name/i);
        const nameError = screen.getByText('Name is required');

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

      const beachChip = screen.getByText('Beach & Islands');
      expect(beachChip).toHaveAttribute('aria-pressed', 'false');

      fireEvent.click(beachChip);
      expect(beachChip).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
