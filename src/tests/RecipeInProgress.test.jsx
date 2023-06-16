import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import drinksMock from './helpers/mocks/drinks/drinksMock';
import nameMealsMock from './helpers/mocks/meals/nameMealsMock';
import mealsMock from './helpers/mocks/meals/mealsMock';
import drinksNameSearch from './helpers/mocks/drinks/drinksNameSearchMock';

const dateMock = '2021-08-25';
describe('Testando a funcionalidade da página RecipeInProgress', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
    localStorage.clear();
  });
  it(
    'Testa a funcionalidade dos checkbox de uma comida e se é salvo no localStorage',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(nameMealsMock)
          .mockResolvedValueOnce(nameMealsMock)
          .mockResolvedValueOnce(drinksMock)
          .mockResolvedValueOnce(nameMealsMock),
      });
      const { history } = renderWithRouterAndRedux(
        <App />,
        { initialEntries: ['/meals/52855/in-progress'] },
      );
      let checkboxArray = await screen.findAllByRole('checkbox');
      let finishRecipeBtn = screen.getByRole('button', { name: /finish/i });
      expect(finishRecipeBtn).toBeDisabled();
      checkboxArray.forEach(({ checked }) => {
        expect(checked).toBeFalsy();
      });
      const favoriteBtn = await screen.findByRole('button', { name: /white-heart-icon/i });
      act(() => {
        userEvent.click(favoriteBtn);
      });
      await screen.findByRole('button', { name: /black-heart-icon/i });
      let localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      expect(localStorageInProgress).not.toBeNull();
      expect(localStorageInProgress.meals['52855']).toHaveLength(0);
      act(() => {
        userEvent.click(checkboxArray[0]);
      });
      expect(checkboxArray[1]).not.toBeChecked();
      expect(checkboxArray[0]).toBeChecked();
      expect(checkboxArray[0].parentNode)
        .toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
      localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      expect(localStorageInProgress.meals['52855']).toHaveLength(1);
      expect(localStorageInProgress.meals['52855']).toContain(0);
      expect(finishRecipeBtn).toBeDisabled();
      act(() => {
        history.push('/meals/52855');
      });
      await screen.findByText(/banana pancakes/i);
      await screen.findByText('GG');
      act(() => {
        userEvent.click(screen.getByRole('button', { name: /continue recipe/i }));
      });
      checkboxArray = await screen.findAllByRole('checkbox');
      expect(checkboxArray[0]).toBeChecked();
      finishRecipeBtn = screen.getByRole('button', { name: /finish/i });
      expect(finishRecipeBtn).toBeDisabled();
      checkboxArray.forEach((checkbox, i) => {
        if (i !== 0) {
          expect(checkbox).not.toBeChecked();
          act(() => {
            userEvent.click(checkbox);
          });
          expect(checkbox).toBeChecked();
        }
      });
      expect(finishRecipeBtn).not.toBeDisabled();
      jest.spyOn(global, 'Date');
      global.Date.mockImplementation(() => ({
        toISOString: jest.fn().mockReturnValue(dateMock),
      }));
      const expectedLocalStorage = [{
        alcoholicOrNot: '',
        category: 'Dessert',
        doneDate: dateMock,
        id: '52855',
        image: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
        name: 'Banana Pancakes',
        nationality: 'American',
        tags: ['Breakfast', 'Desert', 'Sweet'],
        type: 'meal',
      }];
      act(() => {
        userEvent.click(finishRecipeBtn);
      });
      expect(history.location.pathname).toBe('/done-recipes');
      expect(JSON
        .parse(localStorage.getItem('doneRecipes'))).toEqual(expectedLocalStorage);
    },
  );
  it(
    'Testa a funcionalidade dos checkbox de uma bebida e se é salvo no localStorage',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(drinksNameSearch)
          .mockResolvedValueOnce(drinksNameSearch)
          .mockResolvedValueOnce(mealsMock)
          .mockResolvedValueOnce(drinksNameSearch),
      });
      const { history } = renderWithRouterAndRedux(
        <App />,
        { initialEntries: ['/drinks/17222/in-progress'] },
      );
      let checkboxArray = await screen.findAllByRole('checkbox');
      let finishRecipeBtn = screen.getByRole('button', { name: /finish/i });
      expect(finishRecipeBtn).toBeDisabled();
      checkboxArray.forEach(({ checked }) => {
        expect(checked).toBeFalsy();
      });
      let localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      expect(localStorageInProgress).not.toBeNull();
      expect(localStorageInProgress.drinks['17222']).toHaveLength(0);
      act(() => {
        userEvent.click(checkboxArray[0]);
      });
      expect(checkboxArray[1]).not.toBeChecked();
      expect(checkboxArray[0]).toBeChecked();
      expect(checkboxArray[0].parentNode)
        .toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
      localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      expect(localStorageInProgress.drinks['17222']).toHaveLength(1);
      expect(localStorageInProgress.drinks['17222']).toContain(0);
      expect(finishRecipeBtn).toBeDisabled();
      act(() => {
        history.push('/drinks/17222');
      });
      await screen.findByText(/a1/i);
      await screen.findByText('Corba');
      act(() => {
        userEvent.click(screen.getByRole('button', { name: /continue recipe/i }));
      });
      checkboxArray = await screen.findAllByRole('checkbox');
      expect(checkboxArray[0]).toBeChecked();
      finishRecipeBtn = screen.getByRole('button', { name: /finish/i });
      expect(finishRecipeBtn).toBeDisabled();
      checkboxArray.forEach((checkbox, i) => {
        if (i !== 0) {
          expect(checkbox).not.toBeChecked();
          act(() => {
            userEvent.click(checkbox);
          });
          expect(checkbox).toBeChecked();
        } else {
          expect(checkbox).toBeChecked();
          act(() => {
            userEvent.click(checkbox);
          });
          expect(checkbox).not.toBeChecked();
          act(() => {
            userEvent.click(checkbox);
          });
        }
      });
      expect(finishRecipeBtn).not.toBeDisabled();
      jest.spyOn(global, 'Date');
      global.Date.mockImplementation(() => ({
        toISOString: jest.fn().mockReturnValue(dateMock),
      }));
      const expectedLocalStorage = [{
        alcoholicOrNot: 'Alcoholic',
        category: 'Cocktail',
        doneDate: dateMock,
        id: '17222',
        image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        name: 'A1',
        tags: [],
        type: 'drink',
        nationality: '',
      }];
      act(() => {
        userEvent.click(finishRecipeBtn);
      });
      expect(history.location.pathname).toBe('/done-recipes');
      expect(JSON
        .parse(localStorage.getItem('doneRecipes'))).toEqual(expectedLocalStorage);
    },
  );
});
