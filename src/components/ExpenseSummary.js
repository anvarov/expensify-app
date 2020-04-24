import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expensesTotal";

export const ExpenseSummary = (props) => {
  const { expenseTotalNumber, expenseTotal } = props;
  const formattedNumber = numeral(expenseTotal / 10).format("$0,0.00");
  return (
    <div className="page-content">
      <div className="content-container">
        <h1 className="page-content__title">
          Viewing
          <span>{` ${expenseTotalNumber} `}</span>
          expense
          {expenseTotalNumber > 1 ? "s " : " "}
          totalling
          <span>{` ${formattedNumber}`}</span>
        </h1>
        <div className="page-header__actions">
          <Link to="/create" className="button">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

ExpenseSummary.propTypes = {
  expenseTotalNumber: PropTypes.number.isRequired,
  expenseTotal: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const filteredExpenses = getVisibleExpenses(state.expenses, state.filters);

  return {
    expenseTotalNumber: filteredExpenses.length,
    expenseTotal: getExpensesTotal(filteredExpenses),
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
