import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
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
  }, []);

  console.log(recipe);

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
      </div>
    );
  }

  if (recipe.type === 'drink') {
    return (
      <div>
        <Drink recipe={ recipe.data } />
      </div>
    );
  }
}
