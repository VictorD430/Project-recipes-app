import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testando a funcionalidade da page Recipe', () => {
  const mealRoute = '/meals/52771';
  const drinkRoute = '/drinks/178319';
  const timeout = 20000;
  beforeEach(() => {
    localStorage.clear();
  });
  it('testando localStorage', () => {
    // const email = 'user@user.com';
    // const { history } = renderWithRouter(<App />);
    // expect(history.location.pathname).toBe('/');
    // const emailInput = screen.getByLabelText(/email/i);
    // const passwordInput = screen.getByLabelText(/password/i);
    // const button = screen.getByRole('button');
    // expect(button).toBeDisabled();
    // userEvent.type(emailInput, email);
    // userEvent.type(passwordInput, '1234567');
    // expect(emailInput.value).toBe(email);
    // expect(button).not.toBeDisabled();
    // act(() => {
    //   userEvent.click(button);
    // });
    // const { email: emailOnLStorage } = JSON.parse(localStorage.getItem('user'));
    // expect(emailOnLStorage).toBe(email);
    // expect(history.location.pathname).toBe('/meals');
  });
  it('favoritar receita de uma comida, salva corretamente no localStorage', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [mealRoute] });
    expect(history.location.pathname).toBe(mealRoute);
    const loading = screen.queryByText(/loading/i);
    await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
    const favorite = await screen.findByRole('button', { name: /white-heart-icon/i });
    userEvent.click(favorite);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const expectedFavoriteRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ];
    expect(favoriteRecipes).toEqual(expectedFavoriteRecipes);
  }, timeout);
  it('favoritar receita de uma bebida, salva corretamente no localStorage', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [drinkRoute] });
    expect(history.location.pathname).toBe('/drinks/178319');
    const loading = screen.queryByText(/loading/i);
    await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
    const favorite = await screen.findByRole('button', { name: /white-heart-icon/i });
    userEvent.click(favorite);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const expectedFavoriteRecipes = [
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];
    expect(favoriteRecipes).toEqual(expectedFavoriteRecipes);
  }, timeout);
  it('testando a funcionalidade do button StartRecipe', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [mealRoute] });
    expect(history.location.pathname).toBe(mealRoute);
    const loading = screen.queryByText(/loading/i);
    await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
    const startRecipe = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  }, timeout);
  it(
    'testando se já tem uma receita em progresso o button dá a opção de continuar',
    async () => {
      const { history } = renderWithRouterAndRedux(<App />, {
        initialEntries: [mealRoute] });
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ meals: { 52771: [] }, drinks: [] }),
      );
      expect(history.location.pathname).toBe('/meals/52771');
      const loading = screen.queryByText(/loading/i);
      await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
      const startRecipe = await screen.findByRole('button', { name: /continue recipe/i });
      userEvent.click(startRecipe);
      expect(history.location.pathname).toBe('/meals/52771/in-progress');
    },
    timeout,
  );
  it('testando se já tiver uma receita feita o button não é renderizado', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [mealRoute] });
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([{ id: '52771', type: 'meal' }]),
    );
    expect(history.location.pathname).toBe(mealRoute);
    const loading = screen.queryByText(/loading/i);
    await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
    const startRecipe = screen.queryByRole('button', { name: /start recipe/i });
    await waitFor(() => expect(startRecipe).not.toBeInTheDocument());
  }, timeout);
  it.only(
    'testando ao clicar no botão de compartilhar a url é copiada',
    async () => {
      const { history } = renderWithRouterAndRedux(<App />, {
        initialEntries: [mealRoute] });
      expect(history.location.pathname).toBe(mealRoute);
      const loading = screen.queryByText(/loading/i);
      await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
      const shareButton = await screen.findByRole('button', { name: /share-icon/i });
      act(() => {
        userEvent.click(shareButton);
      });

      await screen.findByText(/link copied!/i);
    },
    timeout,
  );
});
