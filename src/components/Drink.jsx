import { PropTypes } from 'prop-types';

export default function Drink({ recipe }) {
  // const { recipes: { recipe } } = useSelector((state) => state);
  // se implementar recipe na store é so descomentar a linha
  const ingredients = Object.entries(recipe)
    .filter((i) => i[0].includes('strIngredient') && (i[1] !== '' && i[1] !== null));
  const measures = { ...ingredients };
  ingredients.forEach((item, index) => {
    measures[index] = recipe[`strMeasure${index + 1}`] || ' ';
  });
  // measures = Object.entries(recipe)
  // .filter((i) => i[0].includes('strMeasure') && (i[1] !== '' && i[1] !== null));
  // função substituida pois no teste do cy o objeto drink retornado tinha 4 ingredientes mas apenas 3 measures.

  return (
    <div>
      Recipes - Drink
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ `imagem ${recipe.strDrink}` }
      />
      <p data-testid="recipe-title">{recipe.strDrink}</p>
      <p data-testid="recipe-category">
        {`${recipe.strCategory} - ${recipe.strAlcoholic}`}
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
      <p data-testid="instructions">{recipe.strInstructions}</p>
    </div>
  );
}

Drink.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
