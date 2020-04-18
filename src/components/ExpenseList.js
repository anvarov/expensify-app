import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => {
  const { expenses } = props;

  return (
    <div>
      {expenses.length === 0 ? (
        <p>No Expenses</p>
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
