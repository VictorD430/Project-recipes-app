import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getDrinksAPI, getMealsAPI } from '../services/fetchAPI';

export default function Recipes() {
  const { recipes: { meals, drinks } } = useSelector((state) => state);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const makeFetch = async () => {
      if (history.location.pathname === '/meals') {
        const apiCategories = await getMealsAPI('list.php?c=list');
        setCategories(apiCategories);
        return;
      }
      const apiCategories = await getDrinksAPI('list.php?c=list');
      setCategories(apiCategories);
    };
    makeFetch();
  }, [setCategories, history]);
  console.log(categories);
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/meals"
            render={ () => (meals.map((meal) => (
              <li key={ meal.idMeal }>
                <p>{meal.strMeal}</p>
              </li>
            ))) }
          />
          <Route
            exact
            path="/drinks"
            render={ () => (drinks.map((drink) => (
              <li key={ drink.idDrink }>
                <p>{drink.strDrink}</p>
              </li>
            ))) }
          />
        </Switch>
      </main>
    </>
  );
}
