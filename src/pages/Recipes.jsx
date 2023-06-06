import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';

export default function Recipes() {
  const { recipes: { meals, drinks } } = useSelector((state) => state);
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
