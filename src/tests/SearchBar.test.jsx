import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a funcionalidade da SearchBar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Ao procurar por receitas através do ingrediente com'
   + ' input vazio ou maior que 1 dispara um alerta', () => {
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
  it('Se selecionado o radio button ingredient e pesquisado', () => {

  });
});
