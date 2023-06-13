import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';
import Meal from '../components/Meal';
import Drink from '../components/Drink';

export default function Recipe() {
  const history = useHistory();
  const [recipe, setRecipe] = useState({ data: [], type: 'nao_definido' });
  const nameOfPropId = `id${recipe.type[0].toUpperCase()}${recipe.type.substring(1)}`;
  const { recipes: { favoriteRecipes } } = useSelector((data) => data);
  const favoriteRecipeLH = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  console.log(favoriteRecipes);

  const isFavorite = favoriteRecipeLH
    .some((favoriteRecipe) => favoriteRecipe.id === recipe
      .data[nameOfPropId] && favoriteRecipe.type === recipe.type);// função para comparar do localStorage
  const id = history.location.pathname.split('/');
  const idRecipe = id[2];

  useEffect(() => {
    const getRecipeInfo = async () => {
      if (history.location.pathname.includes('/meals')) {
        const data = await getMealsAPI(`lookup.php?i=${idRecipe}`);
        setRecipe({ data: data.meals[0], type: 'meal' });
        return;
      }
      const data = await getDrinksAPI(`lookup.php?i=${idRecipe}`);
      setRecipe({ data: data.drinks[0], type: 'drink' });
    };
    getRecipeInfo();
  }, [idRecipe, history.location.pathname]);

  let IdExist = false;
  let isContinued = false;

  const recipesDoneLS = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipesContinuesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const nameOfPropId = `id${recipe.type[0].toUpperCase() + recipe.type.substring(1)}`;

  if (recipesDoneLS && recipe.type !== 'nao_definido') {
    const recipesByActualType = recipesDoneLS.filter((item) => item.type === recipe.type);
    IdExist = recipesByActualType.some((item) => item.id === recipe
      .data[nameOfPropId]);
  }

  if (recipesContinuesLS && recipe.type !== 'nao_definido') {
    const recipesByActualType = recipesContinuesLS[`${recipe.type}s`];
    isContinued = Object.entries(recipesByActualType)
      .some((item) => item[0] === recipe.data[nameOfPropId]);
  }

  const btnTextElement = isContinued ? 'Continue Recipe' : 'Start Recipe';
  const actualLocation = history.location.pathname;
  const btnElement = !IdExist && (
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
  return (
    <div>
      {recipe.type === 'nao_definido' && <div>Loading...</div>}
      {recipe.type === 'meal' && <Meal recipe={ { ...recipe, isFavorite } } />}
      {recipe.type === 'drink' && <Drink recipe={ { ...recipe, isFavorite } } />}
      {recipe.type !== 'nao_definido' && btnElement}
    </div>
  );
}
