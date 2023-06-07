import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser !== null) {
      setEmail(localUser);
    }
  }, []);

  const doneRecipes = () => {
    history.push('/done-recipes');
  };

  const favorites = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div>
      <Header />
      <p data-testid="profile-email">{email}</p>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ doneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ favorites }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
