import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';
import Meal from '../components/Meal';
import Drink from '../components/Drink';

export default function Recipe() {
  // const idTestMeals = 52977;
  // const idTestDrink = 11007;

  const history = useHistory();
  const [recipe, setRecipe] = useState({ data: [], type: 'nao_definido' });
  // const [mealOrDrink, setMealOrDrink] = useState('');
  const id = history.location.pathname.split('/');
  const idRecipe = id[2];
  // const dispatch = useDispatch();

  const getRecipeInfo = async () => {
    if (history.location.pathname.includes('/meals')) {
      const data = await getMealsAPI(`lookup.php?i=${idRecipe}`);
      // setMealOrDrink('Meal');
      // mealOrDrink = 'Meal'
      setRecipe({ data: data.meals[0], type: 'meal' });
      // dispatch(saveRecipe(recipe.meals[0]));
    } else if (history.location.pathname.includes('/drinks')) {
      const data = await getDrinksAPI(`lookup.php?i=${idRecipe}`);
      // setMealOrDrink('Drink');
      // mealOrDrink = 'Drink';
      setRecipe({ data: data.drinks[0], type: 'drink' });

      // dispatch(saveRecipe(recipe.drinks[0]));
    }
  };

  useEffect(() => {
    getRecipeInfo();
    // localStorage.setItem('doneRecipes', JSON.stringify([{
    //   id: '11007',
    //   type: 'meal',
    // }, {
    //   id: '11007',
    //   type: 'drink',
    // }]));
    // localStorage.setItem('inProgressRecipes', JSON.stringify(
    //   {
    //     drinks: {
    //       11007: [],
    //     },
    //     meals: {
    //       52977: [],
    //     },
    //   },
    // ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let IdExist = false;
  let isContinued = false;

  const recipesDoneLS = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipesContinuesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const nameOfPropId = `id${recipe.type[0].toUpperCase() + recipe.type.substring(1)}`;

  if (recipesDoneLS && recipe.type !== 'nao_definido') {
    const recipesByActualType = recipesDoneLS.filter((item) => item.type === recipe.type);
    IdExist = recipesByActualType.some((item) => item.id === recipe
      .data[nameOfPropId]);
  }

  if (recipesContinuesLS && recipe.type !== 'nao_definido') {
    const recipesByActualType = recipesContinuesLS[`${recipe.type}s`];
    isContinued = Object.entries(recipesByActualType)
      .some((item) => item[0] === recipe.data[nameOfPropId]);
    console.log(isContinued);
  }

  const btnTextElement = isContinued ? 'Continue Recipe' : 'Start Recipe';
  const actualLocation = history.location.pathname;
  const btnElement = IdExist ? 'existe' : (
    <button
      data-testid="start-recipe-btn"
      onClick={ () => { history.push(`${actualLocation}/in-progress`); } }
      style={ { position: 'fixed',
        bottom: '0px',
        left: '40px' } }
    >
      {btnTextElement}
    </button>
  );

  if (recipe.type === 'nao_definido') {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (recipe.type === 'meal') {
    return (
      <div>
        <Meal recipe={ recipe.data } />
        { btnElement }
      </div>
    );
  }

  if (recipe.type === 'drink') {
    return (
      <div>
        <Drink recipe={ recipe.data } />
        { btnElement }
      </div>
    );
  }
}
