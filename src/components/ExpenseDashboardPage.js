import React from "react";
import ExpenseListDefault from "./ExpenseList";
import ExpenseListFilter from "./ExpenseListFilters";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilter />
    <ExpenseListDefault />
  </div>
);

export default ExpenseDashboardPage;
