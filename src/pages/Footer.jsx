import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
    >
      <button
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ () => {
          history.push('/drinks');
        } }
      >
        <img src={ drinkIcon } alt="Ícone de bebida" />
      </button>
      <button
        src={ mealIcon }
        data-testid="meals-bottom-btn"
        onClick={ () => {
          history.push('/meals');
        } }
      >
        <img src={ mealIcon } alt="Ícone de comida" />
      </button>
    </footer>
  );
}

export default Footer;
