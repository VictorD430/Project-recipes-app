import { SAVE_RECIPES, SAVE_RECIPE } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  recipe: [],
};

const recipes = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_RECIPES:
    return {
      ...state,
      ...payload };
  case SAVE_RECIPE:
    return {
      ...state,
      recipe: payload };
  default:
    return state;
  }
};

export default recipes;
