import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component {
  onSubmitForm = (expense) => {
    const { onSubmitForm, history } = this.props;
    onSubmitForm(expense);
    history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmitForm={this.onSubmitForm} />
      </div>
    );
  }
}

AddExpensePage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (expense) => dispatch(addExpense(expense)),
});
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
