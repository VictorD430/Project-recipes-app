export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_RECIPE = 'SAVE_RECIPES';
export const FETCH_MEALS = 'FETCH_MEALS';

export const saveRecipes = (payload) => ({
  type: SAVE_RECIPES,
  payload,
});

export const saveRecipe = (payload) => ({
  type: SAVE_RECIPE,
  payload,
});
