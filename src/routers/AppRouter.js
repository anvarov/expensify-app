import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePageDefault from "../components/AddExpense";
import EditExpensePageDefault from "../components/EditExpense";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPageDefault from "../components/LoginPage";
import PrivateRouteDefault from "./PrivateRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" exact component={LoginPageDefault} />
        <PrivateRouteDefault
          path="/dashboard"
          component={ExpenseDashboardPage}
        />
        <PrivateRouteDefault path="/create" component={AddExpensePageDefault} />
        <PrivateRouteDefault
          path="/edit/:id"
          component={EditExpensePageDefault}
        />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
