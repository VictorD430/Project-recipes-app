import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes para a página doneRecipes', () => {
  const mealRecipeName = 'Spicy Arrabiata Penne';
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: mealRecipeName,
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  const INITIAL_STATE = {
    meals: [],
    drinks: [],
    recipe: [],
  };
  afterEach(() => {
    window.localStorage.clear();
    cleanup();
  });
  it('Testando se ao renderizar a página com receitas na lista de favoritos'
  + 'renderiza a lista corretamente.', () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    INITIAL_STATE.doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/done-recipes'],
        initialState: { recipes: INITIAL_STATE },
      },
    );
    expect(localStorage
      .getItem('doneRecipes')).toEqual(JSON.stringify(doneRecipes));
    screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  });

  it('Testando a funcionalidade dos Filtros', () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    INITIAL_STATE.doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/done-recipes'],
        initialState: { recipes: INITIAL_STATE },
      },
    );
    const allFilterBtn = screen.getByRole('button', { name: 'All' });
    const mealsFilterBtn = screen.getByRole('button', { name: 'Meal' });
    const drinksFilterBtn = screen.getByRole('button', { name: 'Drink' });
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
  });
});
