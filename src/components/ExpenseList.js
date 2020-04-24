import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => {
  const { expenses } = props;

  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Amount</div>
        <div className="show-for-desktop">Expense</div>
      </div>
      <div>
        {expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Expenses</span>
          </div>
        ) : (
          expenses.map((expense) => {
            const { description, id, note, amount, createdAt } = expense;
            return (
              <ExpenseListItem
                key={id}
                description={description}
                note={note}
                createdAt={createdAt}
                amount={amount}
                id={id}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      note: PropTypes.string,
      amount: PropTypes.number.isRequired,
      createdAt: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state) => {
    const { expenses, filters } = state;
    return {
      expenses: selectExpenses(expenses, filters),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(ExpenseList);
