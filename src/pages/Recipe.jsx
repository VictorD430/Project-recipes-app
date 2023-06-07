import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';

export default function Recipe() {
  const idTestMeals = 52977;
  const idTestDrink = 11007;
  // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977
  // getMealsAPI();
  // getDrinksAPI();
  // www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
  const history = useHistory();
  const [recipe, setRecipe] = useState('undefined');
  const id = history.location.pathname.split('/');
  const idRecipe = id[2];
  // const dispatch = useDispatch();

  const getRecipeInfo = async () => {
    if (history.location.pathname.includes('/meals')) {
      const data = await getMealsAPI(`lookup.php?i=${idRecipe}`);
      console.log(data);
      console.log(data.meals[0].idMeal);
      setRecipe(data.meals[0]);
    } else if (history.location.pathname.includes('/drinks')) {
      const data = await getDrinksAPI(`lookup.php?i=${idRecipe}`);
      console.log(data);
      console.log(data.drinks[0].idDrink);
      setRecipe(data.drinks[0]);
    }
  };

  useEffect(() => {
    getRecipeInfo();
  }, []);

  console.log(recipe);

  return (
    <div>

      Recipe
    </div>
  );
}
