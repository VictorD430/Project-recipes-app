import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from './Footer';
import DoneCard from '../components/DoneCard';

export default function DoneRecipes() {
  const [filter, setFilter] = useState('all');

  // const mockRecipes = localStorage.setItem('doneRecipes', JSON.stringify([
  //   {
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '23/06/2020',
  //     tags: ['Pasta', 'Curry'],
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     doneDate: '23/06/2020',
  //     tags: [],
  //   },
  // ]));
  // console.log(mockRecipes);
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(recipes);

  function renderCard() {
    if (recipes === null || recipes.length === 0) {
      return (<p>oi</p>);
    }
    if (filter === 'all') {
      return (recipes.map((recipe, index) => (
        <DoneCard
          key={ recipe.id }
          id={ recipe.id }
          name={ recipe.name }
          image={ recipe.image }
          category={ recipe.category }
          doneDate={ recipe.doneDate }
          index={ index }
          tags={ recipe.tags }
          type={ recipe.type }
          nationality={ recipe.nationality }
          alcohoolicOrNot={ recipe.alcoholicOrNot }
        />
      )));
    }
    return (recipes.filter((item) => item.type === filter).map((recipe, index) => (
      <DoneCard
        key={ recipe.id }
        id={ recipe.id }
        name={ recipe.name }
        image={ recipe.image }
        category={ recipe.category }
        doneDate={ recipe.doneDate }
        index={ index }
        tags={ recipe.tags }
        type={ recipe.type }
        nationality={ recipe.nationality }
        alcohoolicOrNot={ recipe.alcoholicOrNot }
      />
    )));
  }
  return (
    <>
      <Header />
      <div>
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
        <ul style={ { display: 'flex', flexWrap: 'wrap' } }>
          { renderCard() }
        </ul>
        <Footer />
      </div>
    </>
  );
}
