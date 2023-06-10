import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Teste do componet "Profile"', () => {
  test('Testa se o email esta sendo renderizado na tela', () => {
    renderWithRouterAndRedux(<Profile />);

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
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
