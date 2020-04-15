import React from "react";
import moment from "moment";
import "react-dates/initialize";
import PropTypes from "prop-types";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description ? props.description : "",
      note: props.note ? props.note : "",
      amount: props.amount ? props.amount : "",
      createdAt: props.createdAt ? moment(props.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({
      description,
    }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({
      note,
    }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount,
      }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({
        createdAt,
      }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    const { amount, description, createdAt, note } = this.state;
    const { onSubmitForm } = this.props;
    e.preventDefault();
    if (!amount || !description) {
      this.setState(() => ({
        error: "Please provide description and amount",
      }));
    } else {
      this.setState(() => ({
        error: "",
      }));
      onSubmitForm({
        description,
        amount: parseFloat(amount, 10) * 100,
        note,
        createdAt: createdAt.valueOf(),
      });
    }
  };

  render() {
    const {
      description,
      amount,
      note,
      createdAt,
      calendarFocused,
      error,
    } = this.state;
    return (
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            onChange={this.onDescriptionChange}
            value={description}
          />
          <input
            type="text"
            placeholder="Amount"
            onChange={this.onAmountChange}
            value={amount}
          />
          <SingleDatePicker
            date={createdAt}
            onDateChange={this.onDateChange}
            focused={calendarFocused}
            onFocusChange={this.onFocusChange}
            id={moment().toString()}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            onChange={this.onNoteChange}
            value={note}
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.number.isRequired,
  note: PropTypes.string,
};

ExpenseForm.defaultProps = {
  note: "",
};
