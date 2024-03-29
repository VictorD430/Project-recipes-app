import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileIcon from './ProfileIcon';
import SearchBar from './SearchBar';
import '../style/Header.css';

export default function Header() {
  return (
    <header
      style={ { display: 'flex',
        justifyContent: 'space-between',
        top: '0',
        width: '100%',
        zIndex: '1',
      } }
    >
      <nav>
        <ProfileIcon />
        <Switch>
          <Route
            exact
            path="/meals"
            render={ () => (
              <>
                <SearchBar />
                <h2 data-testid="page-title">Meals</h2>
              </>
            ) }
          />
          <Route
            exact
            path="/drinks"
            render={ () => (
              <>
                <SearchBar />
                <h2 data-testid="page-title">Drinks</h2>
              </>
            ) }
          />
          <Route
            exact
            path="/profile"
            render={ () => (
              <h2 data-testid="page-title">Profile</h2>
            ) }
          />
          <Route
            exact
            path="/done-recipes"
            render={ () => (
              <h2 data-testid="page-title">Done Recipes</h2>
            ) }
          />
          <Route
            exact
            path="/favorite-recipes"
            render={ () => (
              <h2 data-testid="page-title">Favorite Recipes</h2>
            ) }
          />
        </Switch>
      </nav>
    </header>
  );
}
