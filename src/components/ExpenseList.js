import React from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = (props) => {
  const { expenses } = props;

  return (
    <div>
      <h1>Expense List</h1>
      {expenses.map((expense) => {
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
      })}
    </div>
  );
};
ExpenseList.propTypes = {
  expenses: PropType.arrayOf(
    PropType.shape({
      description: PropType.string.isRequired,
      note: PropType.string,
      amount: PropType.number.isRequired,
      createdAt: PropType.number.isRequired,
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
