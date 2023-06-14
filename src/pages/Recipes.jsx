import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Header from '../components/Header';

import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';
import { saveRecipe } from '../redux/actions';

import Footer from './Footer';

export default function Recipes() {
  const firstItens = 'search.php?s=';
  const { recipes: { meals, drinks } } = useSelector((state) => state);
  const [categories, setCategories] = useState([]);
  const [lastCategory, setLastCategory] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const makeFetch = async () => {
      if (history.location.pathname === '/meals') {
        const apiCategories = await getMealsAPI('list.php?c=list');
        const apiFirstMeals = await getMealsAPI(firstItens);
        setCategories(apiCategories.meals);
        dispatch(saveRecipe(apiFirstMeals));
        return;
      }
      const apiCategories = await getDrinksAPI('list.php?c=list');
      const apiFirstDrinks = await getDrinksAPI(firstItens);
      setCategories(apiCategories.drinks);
      dispatch(saveRecipe(apiFirstDrinks));
    };
    makeFetch();
  }, [dispatch, history.location.pathname]);

  const handleCategoryClick = async (strCategory) => {
    if (history.location.pathname === '/meals') {
      if (lastCategory === strCategory) {
        setLastCategory(null);
        const apiFirstMeals = await getMealsAPI(firstItens);
        dispatch(saveRecipe(apiFirstMeals));
        return;
      }
      setLastCategory(strCategory);
      const categoryMeals = await getMealsAPI(`filter.php?c=${strCategory}`);
      dispatch(saveRecipe(categoryMeals));
      return;
    }
    if (lastCategory === strCategory) {
      setLastCategory(null);
      const apiFirstDrinks = await getDrinksAPI(firstItens);
      dispatch(saveRecipe(apiFirstDrinks));
      return;
    }
    setLastCategory(strCategory);
    const categoryDrinks = await getDrinksAPI(`filter.php?c=${strCategory}`);
    dispatch(saveRecipe(categoryDrinks));
  };
  return (
    <>
      <Header />
      {categories.map(({ strCategory }, i) => (
        i < +'5' && (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleCategoryClick(strCategory) }
          >
            {strCategory}
          </button>
        )))}
      <button
        data-testid="All-category-filter"
        onClick={ async () => {
          if (history.location.pathname === '/meals') {
            const apiFirstMeals = await getMealsAPI(firstItens);
            dispatch(saveRecipe(apiFirstMeals));
            return;
          }
          const apiFirstDrinks = await getDrinksAPI(firstItens);
          dispatch(saveRecipe(apiFirstDrinks));
        } }
      >
        All
      </button>
      <main>
        <ul style={ { display: 'flex', flexWrap: 'wrap' } }>
          <Switch>
            <Route
              exact
              path="/meals"
              render={ () => (meals.map((meal, index) => (
                index < +'12'
                && (
                  <Link
                    to={ `/meals/${meal.idMeal}` }
                    key={ meal.idMeal }
                  >
                    <li
                      data-testid={ `${index}-recipe-card` }
                    >
                      <p
                        data-testid={ `${index}-card-name` }
                      >
                        {meal.strMeal}
                      </p>
                      <img
                        width="100px"
                        data-testid={ `${index}-card-img` }
                        src={ meal.strMealThumb }
                        alt={ meal.strMeal }
                      />
                    </li>
                  </Link>
                )))) }
            />
            <Route
              exact
              path="/drinks"
              render={ () => (drinks.map((drink, index) => (
                index < +'12' && (
                  <Link
                    to={ `/drinks/${drink.idDrink}` }
                    key={ drink.idDrink }
                  >
                    <li
                      data-testid={ `${index}-recipe-card` }
                    >
                      <p
                        data-testid={ `${index}-card-name` }
                      >
                        {drink.strDrink}
                      </p>
                      <img
                        width="100px"
                        data-testid={ `${index}-card-img` }
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
                      />
                    </li>
                  </Link>
                )))) }
            />
          </Switch>
        </ul>
      </main>
      <Footer />
    </>
  );
}
