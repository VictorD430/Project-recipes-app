import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <button src={ drinkIcon } data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="Ícone de bebida" />
      </button>
      <button src={ mealIcon } data-testid="meals-bottom-btn">
        <img src={ mealIcon } alt="Ícone de comida" />
      </button>
      Footer
    </footer>
  );
}

export default Footer;
