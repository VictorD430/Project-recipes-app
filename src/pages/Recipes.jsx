import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';
import { saveRecipes } from '../redux/actions';

export default function Recipes() {
  const { recipes: { meals, drinks } } = useSelector((state) => state);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const makeFetch = async () => {
      if (history.location.pathname === '/meals') {
        const apiCategories = await getMealsAPI('list.php?c=list');
        const apiFirstMeals = await getMealsAPI('search.php?s=');
        dispatch(saveRecipes(apiFirstMeals));
        setCategories(apiCategories.meals)
        return;
      }
      const apiCategories = await getDrinksAPI('list.php?c=list');
      const apiFirstDrinks = await getDrinksAPI('search.php?s=');
      dispatch(saveRecipes(apiFirstDrinks));
      setCategories(apiCategories.drinks);
    };
    makeFetch();
  }, [setCategories, history]);
  return (
    <>
      <Header />
      {categories.map(({ strCategory }, i) => (
        i < +'5' && (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={async () => {
              if (history.location.pathname === '/meals') {
                const categoryMeals = await getMealsAPI(`filter.php?c=${strCategory}`);
                dispatch(saveRecipes(categoryMeals));
                return;
              }
              const categoryDrinks = await getDrinksAPI(`filter.php?c=${strCategory}`);
              dispatch(saveRecipes(categoryDrinks));
            }}
          >
            {strCategory}
          </button>
        )))}
      <button
        data-testid="All-category-filter"
        onClick={async () => {
          if (history.location.pathname === '/meals') {
            const apiFirstMeals = await getMealsAPI('search.php?s=');
            dispatch(saveRecipes(apiFirstMeals));
            return;
          }
          const apiFirstDrinks = await getDrinksAPI('search.php?s=');
          dispatch(saveRecipes(apiFirstDrinks));
        }}
      >
        All
      </button>
      <main>
        <ul>

          <Switch>
            <Route
              exact
              path="/meals"
              render={ () => (meals.map((meal, index) => (
                index < +'12'
                && (
                  <li
                    data-testid={ `${index}-recipe-card` }
                    key={ meal.idMeal }
                  >
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      {meal.strMeal}
                    </p>
                    <img
                      width={ 10 }
                      data-testid={ `${index}-card-img` }
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                    />
                  </li>
                )))) }
            />
            <Route
              exact
              path="/drinks"
              render={ () => (drinks.map((drink, index) => (
                index < +'12' && (
                  <li
                    key={ drink.idDrink }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      {drink.strDrink}
                    </p>
                    <img
                      width={ 10 }
                      data-testid={ `${index}-card-img` }
                      src={ drink.strDrinkThumb }
                      alt={ drink.strDrink }
                    />
                  </li>
                )))) }
            />
          </Switch>
        </ul>
      </main>
    </>
  );
}
