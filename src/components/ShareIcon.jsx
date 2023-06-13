import React from 'react';
import { PropTypes } from 'prop-types';
import shareImage from '../images/shareIcon.svg';

export default function ShareIcon({ pathName, testid = 'share-btn' }) {
  return (
    <button
      data-testid={ testid }
      onClick={ () => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = 'Link copied!';
        newDiv.style.position = 'fixed';
        newDiv.style.top = '0px';
        newDiv.style.left = '40px';
        document.body.appendChild(newDiv);
        navigator.clipboard.writeText(pathName);
      } }
      src={ shareImage }
    >
      <img
        alt="share-icon"
        src={ shareImage }
      />
    </button>
  );
}

ShareIcon.propTypes = {
  pathName: PropTypes.string.isRequired,
  testid: PropTypes.string,
};
