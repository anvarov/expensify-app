import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component {
  onSubmitForm = (expense) => {
    const { onSubmitForm, history } = this.props;
    onSubmitForm(expense);
    history.push("/");
  };

  render() {
    return (
      <div>
        <div className="page-content">
          <div className="content-container">
            <h1>Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmitForm={this.onSubmitForm} />
        </div>
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
  onSubmitForm: (expense) => dispatch(startAddExpense(expense)),
});
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
