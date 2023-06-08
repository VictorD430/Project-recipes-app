import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getDrinksAPI } from '../services/fetchAPI';
import FavoriteIcon from './FavoriteIcon';
import ShareIcon from './ShareIcon';

export default function Meal({ recipe }) {
  // const { recipes: { recipe } } = useSelector((state) => state);
  const ingredients = Object.entries(recipe)
    .filter((i) => i[0].includes('strIngredient') && (i[1] !== '' && i[1] !== null));
  const measures = Object.entries(recipe)
    .filter((i) => i[0].includes('strMeasure') && (i[1] !== '' && i[1] !== null));

  console.log(recipe);
  const [recommendedDrinks, setRecommendedDrinks] = useState([]);

  const getRecommendedDrinks = async () => {
    const data = await getDrinksAPI('search.php?s=');
    console.log(data);
    console.log(data.drinks);

    const [um, dois, tres, quatro, cinco, seis] = data.drinks;
    setRecommendedDrinks([um, dois, tres, quatro, cinco, seis]);
  };

  useEffect(() => {
    getRecommendedDrinks();
  }, []);

  const visibilityOfRecomendations = ['block', 'block', 'none', 'none', 'none', 'none'];

  return (
    <div>
      Recipes - Meal
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ `imagem ${recipe.strMeal}` }
      />
      <FavoriteIcon />
      <ShareIcon pathName={ window.location.href } />
      <p data-testid="recipe-title">{recipe.strMeal}</p>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
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
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {Object.keys(recipe).filter((i) => i[0].includes('strYoutube'))
        ? (
          <iframe
            data-testid="video"
            title={ recipe.strMeal }
            width="420"
            height="315"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          />
        ) : (<div />)}

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
    </div>
  );
}

Meal.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
