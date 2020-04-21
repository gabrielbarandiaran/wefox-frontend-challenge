import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
// Containers
import Dashboard from 'containers/dashboard'

export const history = createHistory();

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;