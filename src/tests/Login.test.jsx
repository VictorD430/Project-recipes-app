import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testando a funcionalidade da page Login', () => {
  it('testando inputs e localStorage', () => {
    const email = 'user@user.com';
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567');
    expect(emailInput.value).toBe(email);
    expect(button).not.toBeDisabled();
    act(() => {
      userEvent.click(button);
    });
    const { email: emailOnLStorage } = JSON.parse(localStorage.getItem('user'));
    expect(emailOnLStorage).toBe(email);
    expect(history.location.pathname).toBe('/meals');
  });
  cleanup();
});
