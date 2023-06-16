import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipeInProfileCard from '../components/RecipeInProfileCard';

export default function Favorites() {
  const favorites = useSelector((s) => s.recipes.favoriteRecipes);
  const [filter, setFilter] = useState('All');

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
        onClick={ () => setFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <ul>
        {
          favorites
            .filter((recipe) => {
              switch (filter) {
              case 'meal':
              case 'drink':
                return recipe.type === filter;
              default:
                return true;
              }
            }).map((recipe, index) => (
              <RecipeInProfileCard
                key={ recipe.id }
                index={ index }
                { ...recipe }
              />
            ))
        }
      </ul>
    </div>
  );
}
