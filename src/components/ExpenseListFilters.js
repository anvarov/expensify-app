import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setEndDate,
  setStartDate,
} from "../actions/filters";

class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: null,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { dispatch } = this.props;
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    const { dispatch, filters } = this.props;
    const { calendarFocused } = this.state;
    return (
      <div>
        <input
          type="text"
          value={filters.text}
          onChange={(e) => {
            dispatch(setTextFilter(e.target.value));
          }}
        />
        <select
          onChange={(e) => {
            if (e.target.value === "date") {
              dispatch(sortByDate());
            } else {
              dispatch(sortByAmount());
            }
          }}
        >
          <option value="date">Date</option>
          <option value="value">Amount</option>
        </select>
        <DateRangePicker
          startDate={filters.startDate}
          startDateId="startDate"
          endDate={filters.endDate}
          endDateId="endDate"
          onDatesChange={this.onDatesChange}
          focusedInput={calendarFocused}
          onFocusChange={this.onFocusChange}
          isOutsideRange={() => false}
          numberOfMonths={1}
          showClearDates
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
});

ExpenseListFilters.propTypes = {
  filters: PropTypes.shape({
    text: PropTypes.string,
    sortyBy: PropTypes.string.isRequired,
    startDate: PropTypes.number,
    endDate: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExpenseListFilters);
