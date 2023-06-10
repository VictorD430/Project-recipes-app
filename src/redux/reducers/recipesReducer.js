import {
  SAVE_RECIPES,
  SAVE_RECIPE,
  SAVE_FAVORITE_MEAL,
  SAVE_FAVORITE_DRINK,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  recipe: [],
  favoriteDrinks: [],
  favoriteMeals: [],
};

const recipes = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_RECIPES:
    return {
      ...state,
      ...payload,
    };
  case SAVE_FAVORITE_MEAL:
    console.log(state);
    return {
      ...state,
      favoriteMeals: [...state.favoriteMeals, payload],
    };
  case SAVE_FAVORITE_DRINK:
    return {
      ...state,
      favoriteDrinks: [...state.favoriteDrinks, payload],
    };
  case SAVE_RECIPE:
    return {
      ...state,
      recipe: payload,
    };
  default: { return state; }
  }
};

export default recipes;
