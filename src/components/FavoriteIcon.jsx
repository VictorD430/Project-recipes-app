import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import notfavoriteImage from '../images/whiteHeartIcon.svg';
import favoriteImage from '../images/blackHeartIcon.svg';
import { addOnFavoriteList, saveRecipes } from '../redux/actions';

export default function FavoriteIcon({ dados, testid = 'favorite-btn' }) {
  const recipe = dados.recipeInfo;
  const dispatch = useDispatch();
  const { type, isFavorite } = dados;
  const imageHeart = isFavorite ? favoriteImage : notfavoriteImage;

  const rmvFavorite = (id, stateLS) => {
    // const upperCaseName = `${type[0].toUpperCase()}${type.substring(1)}`;
    // const nameOfPropId = `id${upperCaseName}`;
    // const stateLS = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const arrayWithOutCurrentRecipe = stateLS
      .filter((recipeLH) => recipeLH.id !== id && recipeLH.type !== type);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayWithOutCurrentRecipe));
    dispatch(saveRecipes(arrayWithOutCurrentRecipe));
  };

  const addFavorite = (id, stateLS, upperCaseName) => {
    // const upperCaseName = `${type[0].toUpperCase()}${type.substring(1)}`;
    // const nameOfPropId = `id${upperCaseName}`;
    // const stateLS = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const recipeObject = {
      id,
      type,
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${upperCaseName}`],
      image: recipe[`str${upperCaseName}Thumb`],
    };
    const newArray = [...stateLS, recipeObject];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    dispatch(addOnFavoriteList(recipeObject));
  };

  const toggleFavorite = () => {
    const upperCaseName = `${type[0].toUpperCase()}${type.substring(1)}`;
    const nameOfPropId = `id${upperCaseName}`;
    const stateLS = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (isFavorite) {
      rmvFavorite(recipe[nameOfPropId], stateLS);
    } else {
      addFavorite(recipe[nameOfPropId], stateLS, upperCaseName);
    }
  };

  return (
    <button
      data-testid={ testid }
      onClick={ toggleFavorite }
      className="favorite-btn"
      src={ imageHeart }
      style={ { position: 'fixed',
        top: '20px',
        right: '10px' } }
    >
      <img
        src={ imageHeart }
        alt="white-heart-icon"
      />
    </button>
  );
}

FavoriteIcon.propTypes = {
  dados: PropTypes.shape().isRequired,
  testid: PropTypes.string,
};
