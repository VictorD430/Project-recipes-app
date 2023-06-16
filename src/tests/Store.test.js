import store from '../redux/store';

describe('Store', () => {
  it('should have an empty initial state', () => {
    expect(store.getState()).toEqual({ recipes: {
      recipe: [],
      meals: [],
      drinks: [],
      favoriteRecipes: [],
    },
    user: {
      userEmail: '',
    } });
  });
});
