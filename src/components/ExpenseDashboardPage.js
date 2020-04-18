import React from "react";
import ExpenseListDefault from "./ExpenseList";
import ExpenseListFilter from "./ExpenseListFilters";
import ExpenseSummaryDefault from "./ExpenseSummary";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilter />
    <ExpenseSummaryDefault />
    <ExpenseListDefault />
  </div>
);

export default ExpenseDashboardPage;
