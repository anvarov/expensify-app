import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePageDefault from "../components/AddExpense";
import EditExpensePageDefault from "../components/EditExpense";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePageDefault} />
        <Route path="/edit/:id" component={EditExpensePageDefault} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
