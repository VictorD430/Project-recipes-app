import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';

export default function Favorites() {
  const favorites = useSelector((s) => s.recipes.favoriteRecipes);
  const [filter, setFilter] = useState('All');
  const initialURL = `http://${window.location.href.split('/')[2]}`;
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <button
        onClick={ () => setFilter('Meals') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('Drinks') }
      >
        Drinks
      </button>
      {
        favorites
          .filter((recipe) => {
            switch (filter) {
            case 'Meals':
              return recipe.type === 'meal';
            case 'Drinks':
              return recipe.type === 'drink';
            default:
              return true;
            }
          })
          .map((recipe, index) => (
            <div key={ recipe.id }>
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
              >
                <img
                  width="100px"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.nationality}
                  {recipe.alcoholicOrNot}
                  {' - '}
                  {recipe.category}
                </p>
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </Link>
              <ShareIcon
                dados={ { ...recipe, recipeInfo: recipe, isFavorite: true } }
                pathName={ `${initialURL}/${recipe.type}s/${recipe.id}` }
                testid={ `${index}-horizontal-share-btn` }
              />
              <FavoriteIcon
                testid={ `${index}-horizontal-favorite-btn` }
                dados={ { ...recipe, recipeInfo: recipe, isFavorite: true } }
                pathName={ `${initialURL}/${recipe.type}s/${recipe.id}` }
              />
            </div>
          ))
      }
    </div>
  );
}
