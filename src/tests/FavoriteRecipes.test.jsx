import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes para a página FavoriteRecipes', () => {
  const mealRecipeName = 'Spicy Arrabiata Penne';
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: mealRecipeName,
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
  ];
  const INITIAL_STATE = {
    meals: [],
    drinks: [],
    recipe: [],
    favoriteRecipes: [],
  };
  afterEach(() => {
    window.localStorage.clear();
    cleanup();
  });
  it('Testando se ao renderizar a página com receitas na lista de favoritos'
  + 'renderiza a lista corretamente.', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    INITIAL_STATE.favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/favorite-recipes'],
        initialState: { recipes: INITIAL_STATE },
      },
    );
    expect(localStorage
      .getItem('favoriteRecipes')).toEqual(JSON.stringify(favoriteRecipes));
    screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
  });

  it('Testando a funcionalidade dos Filtros', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    INITIAL_STATE.favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/favorite-recipes'],
        initialState: { recipes: INITIAL_STATE },
      },
    );
    const { recipes } = store.getState();
    expect(recipes.favoriteRecipes).toEqual(favoriteRecipes);
    const allFilterBtn = screen.getByRole('button', { name: 'All' });
    const mealsFilterBtn = screen.getByRole('button', { name: 'Meals' });
    const drinksFilterBtn = screen.getByRole('button', { name: 'Drinks' });
    screen.getByText(mealRecipeName);
    screen.getByText('Aquamarine');
    act(() => {
      userEvent.click(mealsFilterBtn);
    });
    screen.getByText(mealRecipeName);
    expect(screen.queryByText('Aquamarine')).not.toBeInTheDocument();
    act(() => {
      userEvent.click(drinksFilterBtn);
    });
    screen.getByText('Aquamarine');
    expect(screen.queryByText(mealRecipeName)).not.toBeInTheDocument();
    act(() => {
      userEvent.click(allFilterBtn);
    });
    screen.getByText('Spicy Arrabiata Penne');
    screen.getByText('Aquamarine');
    const [firstFavoriteBtn] = screen
      .getAllByRole('button', { name: 'black-heart-icon' });
    act(() => {
      userEvent.click(firstFavoriteBtn);
    });
    expect(screen.queryByText(/spicy Arrabiata penne/i)).not.toBeInTheDocument();
    screen.getByText(/aquamarine/i);
  });
});
