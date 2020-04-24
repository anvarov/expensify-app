import React from "react";
import ExpenseListDefault from "./ExpenseList";
import ExpenseListFilter from "./ExpenseListFilters";
import ExpenseSummaryDefault from "./ExpenseSummary";

const ExpenseDashboardPage = () => (
  <div className="wrapper--dashboard">
    <ExpenseSummaryDefault />
    <ExpenseListFilter />
    <ExpenseListDefault />
  </div>
);

export default ExpenseDashboardPage;
