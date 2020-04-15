import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpenseForm from "./ExpenseForm";
import { editExpense } from "../actions/expenses";

const EditExpensePage = (props) => {
  const { expense } = props;

  return (
    <div>
      <ExpenseForm
        id={expense.id}
        description={expense.description}
        note={expense.note}
        amount={expense.amount}
        createdAt={expense.createdAt}
        onSubmitForm={(updatedExpense) => {
          props.dispatch(editExpense(expense.id, updatedExpense));
          props.history.push("/");
        }}
      />
    </div>
  );
};
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      (expense) => expense.id === props.match.params.id
    ),
  };
};

EditExpensePage.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    note: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(EditExpensePage);
