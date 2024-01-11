import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { RegisterModal } from './RegisterModal';

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ register: jest.fn() })),
}));

jest.mock('zod', () => ({
  ...jest.requireActual('zod'),
  object: jest.fn(() => ({
    email: jest.fn(),
    name: jest.fn(),
    password: jest.fn(),
  })),
}));

describe('RegisterModal', () => {
  it('should render and submit the form', async () => {
    const onCloseMock = jest.fn();
    const { getByLabelText, getByRole } = render(
      <RegisterModal onClose={onCloseMock} isOpen={true} />
    );

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('should handle validation errors', async () => {
    const { getByLabelText, getByRole } = render(
      <RegisterModal onClose={() => {}} isOpen={true} />
    );

    fireEvent.click(getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      const emailInput = getByLabelText('Email');
      const emailErrorDiv = emailInput?.parentElement?.querySelector(
        '.chakra-form__error-message'
      );
      expect(emailErrorDiv).toHaveTextContent('Invalid email address');

      const nameInput = getByLabelText('Name');
      const nameErrorDiv = nameInput?.parentElement?.querySelector(
        '.chakra-form__error-message'
      );
      expect(nameErrorDiv).toHaveTextContent(
        'Name must be at least 2 characters'
      );

      const passwordInput = getByLabelText('Password');
      const passwordErrorDiv = passwordInput?.parentElement?.querySelector(
        '.chakra-form__error-message'
      );
      expect(passwordErrorDiv).toHaveTextContent(
        'Password must be at least 6 characters'
      );
    });
  });
});
