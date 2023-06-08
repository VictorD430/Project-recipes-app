import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';
import Meal from '../components/Meal';
import Drink from '../components/Drink';

export default function Recipe() {
  const idTestMeals = 52977;
  console.log(idTestMeals);
  const idTestDrink = 11007;
  console.log(idTestDrink);
  // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977
  // getMealsAPI();
  // getDrinksAPI();
  // www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
  const history = useHistory();
  // const [recipe, setRecipe] = useState([]);
  const [mealOrDrink, setMealOrDrink] = useState('');
  const id = history.location.pathname.split('/');
  const idRecipe = id[2];
  const dispatch = useDispatch();
  let recipe;
  const getRecipeInfo = async () => {
    if (history.location.pathname.includes('/meals')) {
      recipe = await getMealsAPI(`lookup.php?i=${idRecipe}`);
      setMealOrDrink('Meal');
      // setRecipe(data.meals[0]);
      dispatch(saveRecipe(recipe.meals[0]));
    } else if (history.location.pathname.includes('/drinks')) {
      recipe = await getDrinksAPI(`lookup.php?i=${idRecipe}`);
      setMealOrDrink('Drink');
      // setRecipe(data.drinks[0]);
      dispatch(saveRecipe(recipe.drinks[0]));
    }
  };

  useEffect(() => {
    getRecipeInfo();
  }, []);

  console.log(recipe);
  if (recipe.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  switch (mealOrDrink) {
  case 'Meal':
    return (<Meal />);
  case 'Drink':
    return (<Drink />);
  default:
    return 'Deu ruim';
  }
}
