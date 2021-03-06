import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description ? props.description : "",
      note: props.note ? props.note : "",
      amount: props.amount ? (props.amount / 100).toString() : "",
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
    e.preventDefault();
    const { amount, description, createdAt, note } = this.state;
    const { onSubmitForm } = this.props;
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
      <form onSubmit={this.onSubmit} className="form">
        {error && <p className="form__error">{error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          onChange={this.onDescriptionChange}
          value={description}
        />
        <input
          type="text"
          className="text-input"
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
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          onChange={this.onNoteChange}
          value={note}
        />
        <div>
          <button type="submit" className="button">
            Add Expense
          </button>
        </div>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  onSubmitForm: PropTypes.func,
  description: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  note: PropTypes.string,
};

ExpenseForm.defaultProps = {
  note: "",
  amount: "",
  description: "",
  createdAt: "",
  onSubmitForm: PropTypes.func,
};
