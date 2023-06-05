import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouterAndRedux';

describe('Testando a funcionalidade da page Login', () => {
  it('testando inputs e localStorage', () => {
    const email = 'user@user.com';
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const [emailInput, passwordInput] = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567');
    expect(emailInput.value).toBe(email);
    expect(button).not.toBeDisabled();
    console.log(button);
    act(() => {
      userEvent.click(button);
    });
    const { email: emailOnLStorage } = JSON.parse(localStorage.getItem('user'));
    expect(emailOnLStorage).toBe(email);
    expect(history.location.pathname).toBe('/meals');
  });
});
