import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import notfavoriteImage from '../images/whiteHeartIcon.svg';
import favoriteImage from '../images/blackHeartIcon.svg'
import { addOnFavoriteList } from '../redux/actions';

export default function FavoriteIcon({ dados }) {
  console.log(dados);
  const recipe = dados.recipeInfo;
  const dispatch = useDispatch();
  const { type,isFavorite } = dados;
  console.log(isFavorite)
  

  const imageHeart = isFavorite ? favoriteImage : notfavoriteImage;
  const addFavorite = () => {
    const upperCaseName = `${type[0].toUpperCase()}${type.substring(1)}`;
    const nameOfPropId = `id${upperCaseName}`;
    const stateLH = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const recipeObject = {
      id: recipe[nameOfPropId],
      type,
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${upperCaseName}`],
      image: recipe[`str${upperCaseName}Thumb`],
    };
    const newArray = [...stateLH, recipeObject];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    dispatch(addOnFavoriteList(recipeObject));
    
    //switch (type) {
    //case 'meal': dispatch(saveFavoriteMeal(recipeObject)); break;
    //case 'drink': dispatch(saveFavoriteDrink(recipeObject)); break;
    //default:
    //}
  };

  return (
    <button
      data-testid="favorite-btn"
      onClick={ addFavorite }
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

};
