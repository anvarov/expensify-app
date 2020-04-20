import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpenseForm from "./ExpenseForm";
import { startEditExpenses, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmitForm = (updatedExpense) => {
    const { history, onSubmitForm, expense } = this.props;
    const { id } = expense;
    onSubmitForm(id, updatedExpense);
    history.push("/");
  };

  onClick = () => {
    const { onClick, history, expense } = this.props;
    const { id } = expense;
    onClick(id);
    history.push("/");
  };

  render() {
    const { expense } = this.props;
    const { description, createdAt, note, amount } = expense;

    return (
      <div>
        <ExpenseForm
          description={description}
          note={note}
          amount={amount}
          createdAt={createdAt}
          onSubmitForm={this.onSubmitForm}
        />
        <button type="button" onClick={this.onClick}>
          Remove
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => dispatch(startRemoveExpense({ id })),
    onSubmitForm: (id, updatedExpense) =>
      dispatch(startEditExpenses(id, updatedExpense)),
  };
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
  onSubmitForm: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
