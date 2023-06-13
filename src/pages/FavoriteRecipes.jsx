import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';

export default function Favorites() {
  const [favoriteRecipesArray, setFavoriteRecipesArray] = useState([]);
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipesArray(favorites);
  }, []);
  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {
        favoriteRecipesArray.map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.category}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
            <ShareIcon testid={ `${index}-horizontal-share-btn` } />
            <FavoriteIcon testid={ `${index}-horizontal-favorite-btn` } />
          </div>
        ))
      }
    </div>
  );
}
