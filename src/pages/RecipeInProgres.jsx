import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';

export default function InProgress() {
  const history = useHistory();
  const locationPathName = history.location.pathname.split('/');
  const type = locationPathName[1];
  const id = locationPathName[2];
  const [recipe, setRecipe] = useState({ data: [], type: 'nao_definido' });
  const nameOfPropSRC = type === 'meals' ? recipe.data.strMealThumb : recipe.data.strDrinkThumb;

  useEffect(() => {
    const getRecipeInfo = async () => {
      if (type === 'meals') {
        const data = await getMealsAPI(`lookup.php?i=${id}`);
        setRecipe({ data: data.meals[0], type: 'meal' });
        return;
      }
      const data = await getDrinksAPI(`lookup.php?i=${id}`);
      setRecipe({ data: data.drinks[0], type: 'drink' });
    };
    getRecipeInfo();
  }, []);

  console.log(recipe);

  return (
    <div>
      InProgress -
      {' '}
      {type}

      <img src={ nameOfPropSRC } alt="recipe-img" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{recipe.data.strArea}</h1>
      <button data-testid="share-btn"> compartilhar</button>
      <button data-testid="favorite-btn"> favoritar </button>
      <p data-testid="recipe-category">{recipe.data.strCategory}</p>
      <p data-testid="instructions">{recipe.data.strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finish</button>

    </div>
  );
}
