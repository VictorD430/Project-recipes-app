import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testando a funcionalidade da page Recipe', () => {
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
  it('favoritar receita de uma comida, salva corretamente no localStorage', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/meals/52771'] });
    expect(history.location.pathname).toBe('/meals/52771');
    const favorite = screen.getByAltText(/white-heart-icon/i);
    userEvent.click(favorite).then(() => {
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
    });
  });
  it('favoritar receita de uma bebida, salva corretamente no localStorage', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/drinks/178319'] });
    expect(history.location.pathname).toBe('/drinks/178319');
    const favorite = screen.getByAltText(/white-heart-icon/i);
    userEvent.click(favorite).then(() => {
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
    });
  });
});
