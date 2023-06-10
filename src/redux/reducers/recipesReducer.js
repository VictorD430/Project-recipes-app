import {
  SAVE_RECIPES,
  SAVE_RECIPE,
  ADD_FAVORITE,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  recipe: [],
  favoriteRecipes: [],
};

const recipes = (state = INITIAL_STATE, { type, payload }) => { console.log(state)
  switch (type) {
    case ADD_FAVORITE:
    return {
      ...state,
      favoriteRecipes: [...state.favoriteRecipes, payload]
    };
  case SAVE_RECIPES:
    return {
      ...state,
      ...payload,
    };
/*  case SAVE_FAVORITE_MEAL:
    console.log(state);
    return {
      ...state,
      favoriteMeals: [...state.favoriteMeals, payload],
    };
  case SAVE_FAVORITE_DRINK:
    return {
      ...state,
      favoriteDrinks: [...state.favoriteDrinks, payload],
    };*/
  case SAVE_RECIPE:
    return {
      ...state,
      recipe: payload,
    };
  default: { return state; }
  }
};

export default recipes;
