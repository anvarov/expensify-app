import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

const EditExpensePage = (props) => {
  const { expense, dispatch } = props;
  const { id, description, createdAt, note, amount } = expense;

  return (
    <div>
      <ExpenseForm
        id={id}
        description={description}
        note={note}
        amount={amount}
        createdAt={createdAt}
        onSubmitForm={(updatedExpense) => {
          props.dispatch(editExpense(id, updatedExpense));
          props.history.push("/");
        }}
      />
      <button
        type="button"
        onClick={() => {
          dispatch(removeExpense({ id }));
          props.history.push("/")
        }}
      >
        Remove
      </button>
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
