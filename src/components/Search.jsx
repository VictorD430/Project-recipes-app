import React, { useState } from 'react';
import searchImage from '../images/searchIcon.svg';

export default function Search() {
  const [letsSearch, setLetsSearch] = useState(false);
  return (
    <>
      <button
        style={ { border: 'none', backgroundColor: 'transparent' } }
        type="button"
        onClick={ () => setLetsSearch(!letsSearch) }
      >
        <img
          data-testid="search-top-btn"
          src={ searchImage }
          alt="search-icon"
        />
      </button>
      { letsSearch && <input
        data-testid="search-input"
        type="text"
        placeholder="Type your recipe"
      />}
    </>
  );
}
