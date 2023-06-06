export const SAVE_RECIPES = 'SAVE_RECIPES';
export const FETCH_MEALS = 'FETCH_MEALS';

export const saveRecipes = (payload) => ({
  type: SAVE_RECIPES,
  payload,
});

const requestRecipe = () => ({
  type: 'REQUEST_RECIPE',
});

const requestRecipeSuccess = (payload) => ({
  type: 'REQUEST_RECIPE_SUCCESS',
  payload,
});

const requestRecipeFailure = () => ({
  type: 'REQUEST_RECIPE_FAILURE',
})

export const getMealsAPI = (endpoint) => async (dispatch) => {
  console.log(endpoint);
  dispatch(requestRecipe());
  const URL = `www.themealdb.com/api/json/v1/1/${endpoint}`;
  try {
    const response = await fetch(URL);
    console.log(response);
    const data = await response.json();
    dispatch(saveRecipes(data.meals));
  } catch (e) {
    console.log('Oi eu sou o nosso erro!', e.message);
    dispatch(requestRecipeFailure());
  }
};

export const getDrinksAPI = (endpoint) => async (dispatch) => {
  const URL = `www.thecocktaildb.com/api/json/v1/1/${endpoint}`;
  try {
    const response = await fetch(URL);
    console.log(response);
    const data = await response.json();
    dispatch(saveRecipes(data.drinks));
  } catch (e) {
    console.log('Oi eu sou seu erro!', e.message);
  }
};
