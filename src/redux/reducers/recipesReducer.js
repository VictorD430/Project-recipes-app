import { SAVE_RECIPES } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  user: {
    userEmail: '',
    userRecipes: {
      inProgress: {},
      favorites: [],
    },
  },

};

const recipes = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_RECIPES:
    return {
      ...state,
      ...payload };
  default:
    return state;
  }
};

export default recipes;
