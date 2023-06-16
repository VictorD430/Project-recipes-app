import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import mealsMock from './helpers/mocks/meals/mealsMock';
import drinksMock from './helpers/mocks/drinks/drinksMock';
import nameMealsMock from './helpers/mocks/meals/nameMealsMock';
import drinksNameSearchMock from './helpers/mocks/drinks/drinksNameSearchMock';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  recipe: [],
  favoriteRecipes: [],
};

describe('Testando a funcionalidade da page Recipe', () => {
  const mealRoute = '/meals/52771';
  const drinkRoute = '/drinks/178319';
  const timeout = 20000;
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    cleanup();
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
    expect(history.location.pathname).toBe(drinkRoute);
    const loading = screen.queryByText(/loading/i);
    await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
    const favorite = await screen.findByRole('button', { name: /white-heart-icon/i });
    userEvent.click(favorite);
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
    expect(screen.queryByRole('button', { name: /black-heart-icon/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /white-heart-icon/i }))
      .not.toBeInTheDocument();
    act(() => {
      userEvent.click(favorite);
    });
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).not.toEqual(expectedFavoriteRecipes);
    expect(screen.queryByRole('button', { name: /white-heart-icon/i })).toBeInTheDocument();
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
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });
  it('Testando a funcionalidade do botão de compartilhar', async () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [drinkRoute] });
    expect(history.location.pathname).toBe(drinkRoute);
    const loading = screen.queryByText(/loading/i);
    await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 15000 });
    const button = await screen.findByRole('button', { name: /share-icon/i });
    userEvent.click(button);
    const shareText = await screen.findByText('Link copied!');
    expect(shareText).toBeInTheDocument();
    await waitFor(() => expect(shareText).not.toBeInTheDocument());
    await waitFor(() => expect(navigator.clipboard.writeText)
      .toHaveBeenCalled(), { timeout: 15000 });
  }, timeout);
  it(
    'testando a renderização das receitas recomendadas'
    + 'e se carrega os favoritos do localstorage',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(nameMealsMock)
          .mockResolvedValueOnce(drinksMock)
          .mockResolvedValueOnce(drinksNameSearchMock)
          .mockResolvedValueOnce(mealsMock),
      });
      const { history } = renderWithRouterAndRedux(
        <App />,
        { initialEntries: ['/meals/52855'] },
      );
      await screen.findByText(/banana pancakes/i);
      await screen.findByText('GG');
      await waitFor(() => drinksMock.drinks.forEach(async ({ strDrink }, i) => {
        if (i < +'6') await screen.findByText(strDrink);
      }));
      act(() => {
        history.push('/drinks/17222');
      });
      await screen.findByText('A1');
      await screen.findByText('Corba');
      mealsMock.meals.forEach(async ({ strMeal }, i) => {
        if (i < +'6') await screen.findByText(strMeal);
      });
    },
  );
  it('Se a receita ja foi finalizada não renderiza nenhum botão', async () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([{ id: '52771', type: 'meal' }]),
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ]));
    INITIAL_STATE.favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [mealRoute], initialState: { recipes: INITIAL_STATE } });
    expect(history.location.pathname).toBe(mealRoute);
    const loading = screen.queryByText(/loading/i);
    await waitFor(() => expect(loading).not.toBeInTheDocument(), { timeout: 19000 });
    await screen.findByRole('button', { name: /black-heart-icon/i });
    const startRecipe = screen.queryByRole('button', { name: /start recipe/i });
    await waitFor(() => expect(startRecipe).not.toBeInTheDocument());
    const continueRecipe = screen.queryByRole('button', { name: /continue recipe/i });
    expect(continueRecipe).not.toBeInTheDocument();
  }, timeout);
});
