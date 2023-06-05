import React from 'react';

export default function Login() {
  return (
    <div>
      <form>
        <input data-testid="email-input" type="email" />
        <input data-testid="password-input" type="password" />
        <button type="button" data-testid="login-submit-btn">Enter</button>
      </form>
    </div>
  );
}
