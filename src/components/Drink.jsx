import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getMealsAPI } from '../services/fetchAPI';
import FavoriteIcon from './FavoriteIcon';
import ShareIcon from './ShareIcon';

// export default function Meal({ recipe }) {
//
//   const recipeInfo = recipe.data;
//   const { type } = recipe;
//   console.log(recipe);
//   console.log(type);
//   console.log(recipeInfo);

export default function Drink({ recipe }) {
  const recipeInfo = recipe.data;
  const { type } = recipe;
  // const { recipes: { recipe } } = useSelector((state) => state);
  // se implementar recipe na store é so descomentar a linha
  const ingredients = Object.entries(recipeInfo)
    .filter((i) => i[0].includes('strIngredient') && (i[1] !== '' && i[1] !== null));
  const measures = { ...ingredients };
  ingredients.forEach((item, index) => {
    measures[index] = recipeInfo[`strMeasure${index + 1}`] || ' ';
  });
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  // measures = Object.entries(recipe)
  // .filter((i) => i[0].includes('strMeasure') && (i[1] !== '' && i[1] !== null));
  // função substituida pois no teste do cy o objeto drink retornado tinha 4 ingredientes mas apenas 3 measures.

  const getRecommendedMeals = async () => {
    const data = await getMealsAPI('search.php?s=');
    console.log(data);
    const [um, dois, tres, quatro, cinco, seis] = data.meals;
    setRecommendedMeals([um, dois, tres, quatro, cinco, seis]);
  };

  useEffect(() => {
    getRecommendedMeals();
  }, []);

  const visibilityOfRecomendations = ['block', 'block', 'none', 'none', 'none', 'none'];

  return (
    <div>
      Recipes - Drink
      <img
        data-testid="recipe-photo"
        src={ recipeInfo.strDrinkThumb }
        alt={ `imagem ${recipe.strDrink}` }
      />

      <FavoriteIcon dados={ { recipeInfo, type } } />
      <ShareIcon pathName={ window.location.href } />
      <p data-testid="recipe-title">{recipeInfo.strDrink}</p>
      <p data-testid="recipe-category">
        {`${recipeInfo.strCategory} - ${recipeInfo.strAlcoholic}`}
      </p>

      <h2>Ingredients</h2>
      {ingredients.map((i, index) => (
        <label key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          <input
            type="checkbox"
          />
          {
            `${i[1]} - ${measures[index]}`
          }
        </label>))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{recipeInfo.strInstructions}</p>

      {
        recommendedMeals.length > 0 ? (
          <div>
            {
              recommendedMeals.map((r, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  style={ { display: visibilityOfRecomendations[index] } }
                >
                  <h1 data-testid={ `${index}-recommendation-title` }>{r.strMeal}</h1>
                  <p>{r.idMeal}</p>
                </div>))
            }
          </div>) : (<div>Sem recomendações ainda</div>)
      }
    </div>
  );
}

Drink.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
