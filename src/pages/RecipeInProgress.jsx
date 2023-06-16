import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FavoriteIcon from '../components/FavoriteIcon';
import ShareIcon from '../components/ShareIcon';
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
    measures[index] = recipe.data[`strMeasure${index + 1}`];
  });
  const isAllChecked = ingredients.length === checkedIngredients.length;
  const { recipes: { favoriteRecipes } } = useSelector((data) => data);

  const nameOfPropId = `id${recipe.type[0].toUpperCase()}${recipe.type.substring(1)}`;
  const isFavorite = favoriteRecipes
    .some((favoriteRecipe) => favoriteRecipe.id === recipe
      .data[nameOfPropId] && favoriteRecipe.type === recipe.type);// função para comparar do localStorage

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
    const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const savedRecipeType = savedRecipes[type] || {};
    const savedRecipeIngredients = savedRecipeType[id] || [];
    setCheckedIngredients(savedRecipeIngredients);
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
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (!inProgressRecipes[type]) {
      inProgressRecipes[type] = {};
    }
    inProgressRecipes[type][id] = checkedIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [checkedIngredients]);

  function toggleLabel(index) {
    const indexElement = document.getElementById(index);
    indexElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    handleIngredientCheck(index);
  }

  const handleFinishRecipe = () => {
    const doneRecipe = {
      id: recipe.data[nameOfPropId],
      nationality: recipe.data.strArea || '',
      name: recipe.data.strMeal || recipe.data.strDrink,
      category: recipe.data.strCategory,
      image: recipe.data.strMealThumb || recipe.data.strDrinkThumb,
      tags: recipe.data.strTags ? recipe.data.strTags.split(',') : [],
      alcoholicOrNot: recipe.data.strAlcoholic || '',
      type: recipe.type,
      doneDate: new Date().toISOString(),
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    doneRecipes.push(doneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    history.push('/done-recipes');
  };

  const fullPathName = window.location.href;
  const inProgressLenght = 12;
  const recipeDetailsPathName = fullPathName
    .substring(0, fullPathName.length - inProgressLenght);

  return (
    <div>
      InProgress -
      {' '}
      {type}
      <img src={ nameOfPropSRC } alt="recipe-img" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{recipe.data.strArea}</h1>
      <FavoriteIcon
        dados={ { recipeInfo: recipe.data,
          type: type.substring(0, type.length - 1),
          isFavorite } }
      />
      <ShareIcon pathName={ recipeDetailsPathName } />
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
            onChange={ () => toggleLabel(index) }
            checked={ checkedIngredients.includes(index) }
          />
          {
            `${i[1]} - ${measures[index]}`
          }
        </label>))}
      <button
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRecipe }
        disabled={ !isAllChecked }
      >
        Finish

      </button>

    </div>
  );
}
