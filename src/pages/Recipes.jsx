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
                      width={ 200 }
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
                      width={ 200 }
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
