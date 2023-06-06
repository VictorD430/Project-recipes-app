import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testando a funcionalidade do Header', () => {
  it('Testando suas renderizações', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const profileIcon = screen.getByRole('img', { name: /profile-icon/i });
    screen.getByRole('img', { name: /search-icon/i });
    screen.getByText(/meals/i);
    act(() => {
      userEvent.click(profileIcon);
    });
    expect(history.location.pathname).toBe('/profile');
    expect(screen.queryByRole('img', { name: /search-icon/i })).not.toBeInTheDocument();
    act(() => {
      history.push('/drinks');
    });
    screen.getByRole('img', { name: /search-icon/i });
    screen.getByText(/drinks/i);
    act(() => {
      history.push('/done-recipes');
    });
    screen.getByText(/done recipes/i);
    act(() => {
      history.push('/favorite-recipes');
    });
    screen.getByText(/favorite recipes/i);
  });
});
