import { useSelector } from 'react-redux';

export default function Drink() {
  const { recipes: { recipe } } = useSelector((state) => state);
  const ingredients = Object.entries(recipe)
    .filter((i) => i[0].includes('strIngredient') && (i[1] !== '' && i[1] !== null));
  const measures = Object.entries(recipe)
    .filter((i) => i[0].includes('strMeasure') && (i[1] !== '' && i[1] !== null));
  return (
    <div>
      Recipes -
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ `imagem ${recipe.strDrink}` }
      />
      <p data-testid="recipe-title">{recipe.strDrink}</p>
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
    </div>
  );
}
