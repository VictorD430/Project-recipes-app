import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import searchImage from '../images/searchIcon.svg';
import { saveRecipes } from '../redux/actions';
import { getMealsAPI, getDrinksAPI } from '../services/fetchAPI';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { location } = useHistory();

  const [letsSearch, setLetsSearch] = useState(false);
  const [searchBy, setSearchBy] = useState('by-name');
  const [searchValue, setSearchValue] = useState('');

  const makeFetch = async () => {
    let data;
    if ((searchValue.length === 0
      || searchValue.length > 1)
      && searchBy === 'by-first-letter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    switch (searchBy) {
    case 'by-name':
      if (location.pathname === '/meals') {
        data = await getMealsAPI(`search.php?s=${searchValue}`);
        data = { meals: data.meals };
      } else {
        data = await getDrinksAPI(`search.php?s=${searchValue}`);
        data = { drinks: data.drinks };
      }
      break;
    case 'by-ingredient':
      if (location.pathname === '/meals') {
        data = await getMealsAPI(`filter.php?i=${searchValue}`);
        data = { meals: data.meals };
        getMealsAPI(`filter.php?i=${searchValue}`);
      } else {
        data = await getDrinksAPI(`filter.php?i=${searchValue}`);
        data = { drinks: data.drinks };
      }
      break;
    default:
      if (location.pathname === '/meals') {
        data = await getMealsAPI(`search.php?f=${searchValue}`);
        data = { meals: data.meals };
      } else {
        data = await getDrinksAPI(`search.php?f=${searchValue}`);
        data = { drinks: data.drinks };
      }
      break;
    }
    dispatch(saveRecipes(data));
  };

  return (
    <>
      <button
        style={ { border: 'none', backgroundColor: 'transparent' } }
        type="button"
        onClick={ () => setLetsSearch(!letsSearch) }
      >
        <img
          data-testid="search-top-btn"
          src={ searchImage }
          alt="search-icon"
        />
      </button>
      {letsSearch && (
        <div>
          <input
            data-testid="search-input"
            type="text"
            value={ searchValue }
            placeholder="Type your recipe"
            onChange={ ({ target: { value } }) => setSearchValue(value) }
          />
          <label htmlFor="by-ingredient">Ingredient</label>
          <input
            type="radio"
            name="filter-by"
            id="by-ingredient"
            data-testid="ingredient-search-radio"
            value="by-ingredient"
            onClick={ ({ target: { value } }) => setSearchBy(value) }
          />
          <label htmlFor="by-name">Name</label>
          <input
            type="radio"
            name="filter-by"
            id="by-name"
            data-testid="name-search-radio"
            value="by-name"
            onClick={ ({ target: { value } }) => setSearchBy(value) }
          />
          <label htmlFor="by-first-letter">First Letter</label>
          <input
            type="radio"
            id="by-first-letter"
            name="filter-by"
            data-testid="first-letter-search-radio"
            value="by-first-letter"
            onClick={ ({ target: { value } }) => setSearchBy(value) }
          />
          <button
            data-testid="exec-search-btn"
            onClick={ makeFetch }
          >
            Search
          </button>
        </div>
      )}
    </>
  );
}
