import React from 'react';
import favoriteImage from '../images/whiteHeartIcon.svg';

export default function FavoriteIcon() {
  return (
    <button data-testid="favorite-btn">
      <img
        style={ { position: 'fixed',
          top: '10px',
          right: '40px' } }
        src={ favoriteImage }
        alt="white-heart-icon"
      />
    </button>
  );
}
