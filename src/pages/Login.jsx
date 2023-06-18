import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import isEmail from 'validator/lib/isEmail';
import '../style/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    const validateButton = () => setDisabled(!isEmail(email)
    || password.length <= Number('6'));
    validateButton();
  }, [email, password]);

  return (
    <section className="login-page">
      <form onSubmit={ handleSubmit } className="login-container">
        <label htmlFor="email">
          Email
        </label>
        <input
          data-testid="email-input"
          type="email"
          id="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          disabled={ false }
        />
        <label htmlFor="password">
          Password
        </label>
        <input
          data-testid="password-input"
          type="password"
          id="password"
          value={ password }
          disabled={ false }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleSubmit }
          disabled={ disabled }
        >
          Enter
        </button>
      </form>
    </section>
  );
}
