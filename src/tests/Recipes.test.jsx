import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mealsMock from './helpers/mocks/meals/mealsMock';
import categoriesMealsMock from './helpers/mocks/meals/categoriesMealsMock';
import drinksMock from './helpers/mocks/drinks/drinksMock';
import categoriesDrinksMock from './helpers/mocks/drinks/categoriesDrinksMock';

import beefCategoryMock from './helpers/mocks/meals/beefCategorymock';
import ordinaryCategoryMock from './helpers/mocks/drinks/ordinaryCategoryMock';

describe('Testando a funcionalidade da página Recipes', () => {
  it('Funcionalidade dos Filtros por categoria na rota /Meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(categoriesMealsMock)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(beefCategoryMock)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(beefCategoryMock)
        .mockResolvedValueOnce(mealsMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const maxListLength = 12;
    await screen.findByText('Corba');
    const firstRequestList = await screen.findAllByRole('listitem');
    expect(firstRequestList).toHaveLength(maxListLength);
    const beefButton = await screen.findByRole('button', { name: /beef/i });
    act(() => {
      userEvent.click(beefButton);
    });
    await waitFor(() => expect(screen.queryByText('Corba')).not.toBeInTheDocument());
    await screen.findByText(/beef and mustard pie/i);
    act(() => {
      userEvent.click(beefButton);
    });
    await waitFor(() => expect(screen.queryByText(/beef and mustard pie/i)).not.toBeInTheDocument());
    await screen.findByText('Corba');
    act(() => {
      userEvent.click(beefButton);
    });
    await waitFor(() => expect(screen.queryByText('Corba')).not.toBeInTheDocument());
    await screen.findByText(/beef and mustard pie/i);
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /all/i }));
    });
    await waitFor(
      () => expect(screen.queryByText(/beef and mustard pie/i)).not.toBeInTheDocument(),
    );
    await screen.findByText('Corba');
  });
  it('Funcionalidade dos Filtros por categoria na rota /Drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(categoriesDrinksMock)
        .mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(ordinaryCategoryMock)
        .mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(ordinaryCategoryMock)
        .mockResolvedValueOnce(drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    const maxListLength = 12;
    await screen.findByText('GG');
    const firstRequestList = await screen.findAllByRole('listitem');
    expect(firstRequestList).toHaveLength(maxListLength);
    const ordinaryButton = await screen.findByRole('button', { name: /ordinary drink/i });
    act(() => {
      userEvent.click(ordinaryButton);
    });
    await waitFor(() => expect(screen.queryByText('GG')).not.toBeInTheDocument());
    await screen.findByText(/3-Mile Long Island Iced Tea/i);
    act(() => {
      userEvent.click(ordinaryButton);
    });
    await waitFor(() => expect(screen.queryByText(/3-Mile Long Island Iced Tea/i)).not.toBeInTheDocument());
    await screen.findByText('GG');
    act(() => {
      userEvent.click(ordinaryButton);
    });
    await waitFor(() => expect(screen.queryByText('GG')).not.toBeInTheDocument());
    await screen.findByText(/3-Mile Long Island Iced Tea/i);
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /all/i }));
    });
    await waitFor(
      () => expect(screen.queryByText(/3-Mile Long Island Iced Tea/i)).not.toBeInTheDocument(),
    );
    await screen.findByText('GG');
  });
});
