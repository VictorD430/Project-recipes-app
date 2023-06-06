import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileImage from '../images/profileIcon.svg';

export default function ProfileIcon() {
  return (
    <Link to="/profile">
      <img
        src={ profileImage }
        data-testid="profile-top-btn"
        alt="profile-icon"
      />
    </Link>
  );
}
