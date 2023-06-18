import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getDrinksAPI } from '../services/fetchAPI';
import FavoriteIcon from './FavoriteIcon';
import ShareIcon from './ShareIcon';

export default function Meal({ recipe }) {
  // const { recipe, type } = data;
  const recipeInfo = recipe.data;
  const { type, isFavorite } = recipe;
  // const { recipe: recipeInfo, type } = recipe;
  // const { recipes: { recipe } } = useSelector((state) => state);
  const ingredients = Object.entries(recipeInfo)
    .filter((i) => i[0].includes('strIngredient') && (i[1] !== '' && i[1] !== null));
  const measures = Object.entries(recipeInfo)
    .filter((i) => i[0].includes('strMeasure') && (i[1] !== '' && i[1] !== null));

  const [recommendedDrinks, setRecommendedDrinks] = useState([]);

  const getRecommendedDrinks = async () => {
    const drink = await getDrinksAPI('search.php?s=');

    const [um, dois, tres, quatro, cinco, seis] = drink.drinks;
    setRecommendedDrinks([um, dois, tres, quatro, cinco, seis]);
  };

  useEffect(() => {
    getRecommendedDrinks();
  }, []);

  const visibilityOfRecomendations = ['block', 'block', 'none', 'none', 'none', 'none'];

  return (
    <>
      Recipes - Meal
      <img
        data-testid="recipe-photo"
        width="200px"
        src={ recipeInfo.strMealThumb }
        alt={ `imagem ${recipeInfo.strMeal}` }
      />

      <FavoriteIcon dados={ { recipeInfo, type, isFavorite } } />
      <ShareIcon pathName={ window.location.href } />
      <p data-testid="recipe-title">{recipeInfo.strMeal}</p>
      <p data-testid="recipe-category">{recipeInfo.strCategory}</p>
      <h2>Ingredients</h2>
      {ingredients.map((i, index) => (
        <label key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          <input
            type="checkbox"
          />
          {
            `${i[1]} - ${measures[index][1]}`
          }
        </label>))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{recipeInfo.strInstructions}</p>
      <div className="player-container">
        {Object.keys(recipeInfo).filter((i) => i[0].includes('strYoutube'))
          && (
            <iframe
              data-testid="video"
              title={ recipeInfo.strMeal }
              width="420"
              height="315"
              src={ recipeInfo.strYoutube.replace('watch?v=', 'embed/') }
            />
          )}
      </div>
      {
        recommendedDrinks.length > 0 ? (
          <div>
            {
              recommendedDrinks.map((r, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  style={ { display: visibilityOfRecomendations[index] } }
                >
                  <h1 data-testid={ `${index}-recommendation-title` }>{r.strDrink}</h1>
                  <p>{r.idDrink}</p>
                </div>))
            }
          </div>
        ) : (<div>Sem recomendações ainda</div>)
      }
    </>
  );
}

Meal.propTypes = {
  recipe: PropTypes.shape().isRequired,

};
