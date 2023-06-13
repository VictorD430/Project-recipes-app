import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Profile from '../pages/Profile';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Teste do componet "Profile"', () => {
  test('Testa se o email esta sendo renderizado na tela', async () => {
    const emailUser = 'user@user.com.br';
    localStorage.clear();
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, emailUser);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);
    const profileIcon = screen.getByRole('img', { name: /profile-icon/i });
    userEvent.click(profileIcon);
    const emailProfile = await screen.findByTestId('profile-email');
    expect(emailProfile).toBeInTheDocument();
  });
  test('Testa se os botoes estao sendo renderizados na tela', () => {
    renderWithRouterAndRedux(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  test('Testa se ao clicar no botao "Done Recipes", a rota se altera', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testa se ao clicar no botao "Favorite Recipes", a rota se altera', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se ao clicar no botao "Logout", a rota se altera', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se o localStorage se limpa apos clicar em logout', () => {});
  test('', () => {});
});
