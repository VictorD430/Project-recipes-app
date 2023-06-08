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
    // localStorage.setItem('doneRecipes', JSON.stringify([{
    //   id: '52977',
    //   type: 'meal',
    //   // nationality: nacionalidade-da-receita-ou-texto-vazio,
    //   // category: categoria-da-receita-ou-texto-vazio,
    //   // alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    //   // name: nome-da-receita,
    //   // image: imagem-da-receita,
    //   // doneDate: quando-a-receita-foi-concluida,
    //   // tags: array-de-tags-da-receita-ou-array-vazio
    // }, {
    //   id: '10',
    //   type: 'drink',
    //   // nationality: nacionalidade-da-receita-ou-texto-vazio,
    //   // category: categoria-da-receita-ou-texto-vazio,
    //   // alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    //   // name: nome-da-receita,
    //   // image: imagem-da-receita,
    //   // doneDate: quando-a-receita-foi-concluida,
    //   // tags: array-de-tags-da-receita-ou-array-vazio
    // }]));
  }, []);

  let IdExist;
  const localRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  if (localRecipe || recipe.type !== 'nao_definido') {
    const checkId = localRecipe.filter((item) => item.type === recipe.type);
    IdExist = checkId.some((item) => item.id === recipe
      .data[`id${recipe.type[0].toUpperCase() + recipe.type.substring(1)}`]);
  }

  const btnElement = IdExist ? 'existe' : (
    <button
      data-testid="start-recipe-btn"
      style={ { position: 'fixed',
        bottom: '0px' } }
    >
      Start Recipe
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
