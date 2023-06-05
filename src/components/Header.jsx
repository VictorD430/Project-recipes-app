import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

export default function Header() {
  return (
    <div>
      <Switch>
        <Route exact path="/meals" render={ () => <div>Oi</div> } />
      </Switch>
    </div>
  );
}
