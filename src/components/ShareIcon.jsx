import React from 'react';
import { PropTypes } from 'prop-types';
import shareImage from '../images/shareIcon.svg';

export default function ShareIcon({ pathName, testid = 'share-btn' }) {
  return (
    <button
      style={ { position: 'fixed',
        top: '10px',
        right: '65px' } }
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
    >
      <img
        src={ shareImage }
        alt="share-icon"
      />
    </button>
  );
}

ShareIcon.propTypes = {
  pathName: PropTypes.string.isRequired,
  testid: PropTypes.string,
};
