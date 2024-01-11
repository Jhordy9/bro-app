import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ login: jest.fn() })),
}));

jest.mock('zod', () => ({
  ...jest.requireActual('zod'),
  object: jest.fn(() => ({
    email: jest.fn(),
    password: jest.fn(),
  })),
}));

describe('LoginForm', () => {
  it('should render and submit the form', async () => {
    const onOpenMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <LoginForm onOpen={onOpenMock} />
    );

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(onOpenMock).not.toHaveBeenCalled();
    });
  });

  it('should handle validation errors', async () => {
    const { getByLabelText, getByText } = render(
      <LoginForm onOpen={() => {}} />
    );

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      const emailInput = getByLabelText('Email');
      const emailErrorDiv = emailInput?.parentElement?.querySelector(
        '.chakra-form__error-message'
      );
      expect(emailErrorDiv).toHaveTextContent('Invalid email address');

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
