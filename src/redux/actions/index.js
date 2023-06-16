export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_RECIPE = 'SAVE_RECIPE';
export const FETCH_MEALS = 'FETCH_MEALS';
// export const SAVE_FAVORITE_MEAL = 'SAVE_FAVORITE_MEAL';
// export const SAVE_FAVORITE_DRINK = 'FETCH_FAVORITE_DRINK';
export const ADD_FAVORITE = 'ADD_FAVORITE';

export const saveRecipes = (payload) => ({
  type: SAVE_RECIPES,
  payload,
});

export const saveRecipe = (payload) => ({
  type: SAVE_RECIPE,
  payload,
});

export const addOnFavoriteList = (payload) => ({
  type: ADD_FAVORITE,
  payload,
});
