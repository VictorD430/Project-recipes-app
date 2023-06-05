import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const regexp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    const validateButton = () => setDisabled(!regexp
      .test(email) || password.length <= Number('6'));
    validateButton();
  }, [email, regexp, password]);

  return (
    <div>
      <form onSubmit={ handleSubmit }>
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
    </div>
  );
}
