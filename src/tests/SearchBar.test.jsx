import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mealsMock from './helpers/mocks/meals/mealsMock';
import categoriesMealsMock from './helpers/mocks/meals/categoriesMealsMock';
import mealsFirstLetterSearchMock from './helpers/mocks/meals/mealsFirstLetterSearchMock';
import nameMealsMock from './helpers/mocks/meals/nameMealsMock';
import mealsIngredientSearchMock from './helpers/mocks/meals/mealsIngredientSearchMock';
import drinksMock from './helpers/mocks/drinks/drinksMock';
import categoriesDrinksMock from './helpers/mocks/drinks/categoriesDrinksMock';
import drinksIngredientSearchMock
  from './helpers/mocks/drinks/drinksIngredientSearchMock';
import drinksFirstLetterSearchMock
  from './helpers/mocks/drinks/drinksFirstLetterSearchMock';
import drinksNameSearchMock from './helpers/mocks/drinks/drinksNameSearchMock';
import nullAPImock from './helpers/mocks/nullAPImock';

describe('Testando a funcionalidade da SearchBar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Ao procurar por receitas através do ingrediente '
  + 'com um valor inválido dispara um alerta', () => {
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByRole('textbox');
    const [,, ingredientInputRadio] = screen.getAllByRole('radio');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchInput).toHaveValue('');
    expect(ingredientInputRadio).not.toBeChecked();
    userEvent.click(ingredientInputRadio);
    expect(ingredientInputRadio).toBeChecked();
    act(() => {
      userEvent.click(searchButton);
    });
    expect(global.alert)
      .toHaveBeenCalledWith('Your search must have only 1 (one) character');
    userEvent.type(searchInput, 'aça');
    expect(searchInput).toHaveValue('aça');
    act(() => {
      userEvent.click(searchButton);
    });
    expect(global.alert)
      .toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  it('Se selecionado o radio button ingredient e pesquisado com um valor válido '
  + 'renderiza os itens na tela da maneira correta', async () => {
    const maxListLength = 12;
    const secondRequestLength = 3;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(categoriesMealsMock)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(mealsIngredientSearchMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const firstRequestList = await screen.findAllByRole('listitem');
    expect(firstRequestList).toHaveLength(maxListLength);
    const searchInput = screen.getByRole('textbox');
    const ingredientInputRadio = screen.getByLabelText(/ingredient/i);
    userEvent.click(ingredientInputRadio);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'banana');
    expect(searchInput).toHaveValue('banana');
    expect(ingredientInputRadio).toBeChecked();
    act(() => {
      userEvent.click(searchButton);
    });
    await screen.findByText('Banana Pancakes');
    const secondRequestList = await screen.findAllByRole('listitem');
    expect(secondRequestList).toHaveLength(secondRequestLength);
  });
  it('Se pesquisado através do nome e o retorno vier apenas uma receita,'
  + 'redireciona o usuário para a página de detalhes da receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(categoriesMealsMock)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(nameMealsMock),
    });
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    await waitFor(() => screen.findByText('Corba'));
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByRole('textbox');
    const nameInputRadio = screen.getByLabelText(/name/i);
    userEvent.click(nameInputRadio);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'banana pancakes');
    expect(searchInput).toHaveValue('banana pancakes');
    expect(nameInputRadio).toBeChecked();
    act(() => {
      userEvent.click(searchButton);
    });
    await waitFor(
      () => expect(history.location.pathname).toBe('/meals/52855'),
    );
  });
  it('Se pesquisado através da primeira letra,'
  + 'renderiza a resposta correta da API ', async () => {
    const requestLength = 4;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(categoriesMealsMock)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(mealsFirstLetterSearchMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    await waitFor(() => screen.findByText('Corba'));
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByRole('textbox');
    const firstLetterInputRadio = screen.getByLabelText(/first letter/i);
    userEvent.click(firstLetterInputRadio);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'a');
    expect(searchInput).toHaveValue('a');
    expect(firstLetterInputRadio).toBeChecked();
    act(() => {
      userEvent.click(searchButton);
    });
    await screen.findByText('Apple Frangipan Tart');
    const secondRequestList = await screen.findAllByRole('listitem');
    expect(secondRequestList).toHaveLength(requestLength);
  });
  it('testa as requisições na página de bebidas', async () => {
    const maxListLength = 12;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(categoriesDrinksMock)
        .mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(drinksIngredientSearchMock)
        .mockResolvedValueOnce(drinksFirstLetterSearchMock)
        .mockResolvedValueOnce(drinksNameSearchMock),
    });
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/drinks'] },
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByRole('textbox');
    const ingredientInputRadio = screen.getByLabelText(/ingredient/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(ingredientInputRadio);
    userEvent.type(searchInput, 'lemon');
    expect(searchInput).toHaveValue('lemon');
    expect(ingredientInputRadio).toBeChecked();
    act(() => {
      userEvent.click(searchButton);
    });
    await screen.findByText('A True Amaretto Sour');
    const secondRequestList = await screen.findAllByRole('listitem');
    expect(secondRequestList).toHaveLength(maxListLength);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'a');
    userEvent.click(screen.getByLabelText(/first letter/i));
    expect(searchInput).toHaveValue('a');
    act(() => {
      userEvent.click(searchButton);
    });
    await screen.findByText('A1');
    const thirdRequestList = await screen.findAllByRole('listitem');
    expect(thirdRequestList).toHaveLength(maxListLength);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'A1');
    userEvent.click(screen.getByLabelText(/name/i));
    expect(searchInput).toHaveValue('A1');
    act(() => {
      userEvent.click(searchButton);
    });
    await waitFor(
      () => expect(history.location.pathname).toBe('/drinks/17222'),
    );
  });
  it('Testando se o retorno da API for nulo dispara um alerta', async () => {
    jest.spyOn(global, 'fetch');
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(categoriesDrinksMock)
        .mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(nullAPImock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    await waitFor(() => screen.findByText('GG'));
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByRole('textbox');
    const nameInputRadio = screen.getByLabelText(/name/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(nameInputRadio);
    userEvent.type(searchInput, 'Batatinha Frita 123');
    expect(searchInput).toHaveValue('Batatinha Frita 123');
    expect(nameInputRadio).toBeChecked();
    act(() => {
      userEvent.click(searchButton);
    });
    expect(window.alert)
      .toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
});
