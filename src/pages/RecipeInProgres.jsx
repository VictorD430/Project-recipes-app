import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';

export default function InProgress() {
  const history = useHistory();

  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const locationPathName = history.location.pathname.split('/');
  const type = locationPathName[1];
  const id = locationPathName[2];
  const [recipe, setRecipe] = useState({ data: [], type: 'nao_definido' });
  const nameOfPropSRC = type === 'meals'
    ? recipe.data.strMealThumb : recipe.data.strDrinkThumb;

  const ingredients = Object.entries(recipe.data)
    .filter((i) => i[0].includes('strIngredient') && (i[1] !== '' && i[1] !== null));
  const measures = { ...ingredients };
  ingredients.forEach((item, index) => {
    measures[index] = recipe.data[`strMeasure${index + 1}`] || ' ';
  });

  const handleIngredientCheck = (index) => {
    const ingredientIndex = checkedIngredients.indexOf(index);
    if (ingredientIndex > +'-1') {
      const updatedIngredients = [...checkedIngredients];
      updatedIngredients.splice(ingredientIndex, 1);
      setCheckedIngredients(updatedIngredients);
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };

  useEffect(() => {
    const savedIngredients = localStorage.getItem('inProgressRecipes');
    if (savedIngredients) {
      setCheckedIngredients(JSON.parse(savedIngredients));
    }
  }, []);

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

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
  }, [checkedIngredients]);

  function toggleLabel(index) {
    const indexElement = document.getElementById(index);
    console.log(indexElement);
    indexElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    handleIngredientCheck(index);
  }

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
      <h2>Ingredients</h2>
      {ingredients.map((i, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          id={ index }
          onChange={ () => { toggleLabel(index); } }
        >
          <input
            type="checkbox"
            checked={ checkedIngredients.includes(index) }
          />
          {
            `${i[1]} - ${measures[index]}`
          }
        </label>))}
      <button
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Finish

      </button>

    </div>
  );
}
