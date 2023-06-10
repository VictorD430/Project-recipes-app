export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_RECIPE = 'SAVE_RECIPES';
export const FETCH_MEALS = 'FETCH_MEALS';
export const SAVE_FAVORITE_MEAL = 'SAVE_FAVORITE_MEAL';
export const SAVE_FAVORITE_DRINK = 'FETCH_FAVORITE_DRINK';

export const saveRecipes = (payload) => ({
  type: SAVE_RECIPES,
  payload,
});

export const saveRecipe = (payload) => ({
  type: SAVE_RECIPE,
  payload,
});

export const saveFavoriteDrink = (payload) => ({
  type: SAVE_FAVORITE_DRINK,
  payload,
});

export const saveFavoriteMeal = (payload) => ({
  type: SAVE_FAVORITE_MEAL,
  payload,
});
