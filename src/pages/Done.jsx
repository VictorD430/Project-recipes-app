import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from './Footer';
import RecipeInProfileCard from '../components/RecipeInProfileCard';

export default function DoneRecipes() {
  const [filter, setFilter] = useState('all');

  /* localStorage.setItem('doneRecipes', JSON.stringify([
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ])); */
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <>
      <Header />
      <div>
        <div style={ { display: 'flex' } }>
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('all') }
            type="button"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => setFilter('meal') }
            type="button"
          >
            Meal
          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('drink') }
            type="button"
          >
            Drink
          </button>
        </div>
        <div>
          <ul style={ { display: 'flex', flexWrap: 'wrap' } }>
            { recipes === null || recipes.length === 0 ? (
              <p>You have not completed any recipes yet!</p>
            ) : (recipes.filter((item) => {
              switch (filter) {
              case 'meal':
              case 'drink':
                return item.type === filter;
              default: return true;
              }
            }).map((recipe, index) => (
              <RecipeInProfileCard
                key={ recipe.id }
                index={ index }
                { ...recipe }
                alcoholicOrNot={ recipe.alcoholicOrNot }
              />
            ))
            )}
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
}
