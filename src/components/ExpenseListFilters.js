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

export class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: null,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { dispatchSetEndDate, dispatchSetStartDate } = this.props;
    dispatchSetStartDate(startDate);
    dispatchSetEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  onChangeSortType = (e) => {
    const { dispatchSortByAmount, dispatchSortByDate } = this.props;
    if (e.target.value === "date") {
      dispatchSortByDate();
    } else {
      dispatchSortByAmount();
    }
  };

  onChangeTextFilter = (e) => {
    const { dispatchSetTextFilter } = this.props;
    dispatchSetTextFilter(e.target.value);
  };

  render() {
    const { filters } = this.props;
    const { calendarFocused } = this.state;
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              placeholder="Search expenses"
              className="text-input"
              type="text"
              value={filters.text}
              onChange={this.onChangeTextFilter}
            />
          </div>
          <div className="input-group__item">
            <select className="select" onChange={this.onChangeSortType}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetTextFilter: (text) => dispatch(setTextFilter(text)),
  dispatchSortByAmount: () => dispatch(sortByAmount()),
  dispatchSortByDate: () => dispatch(sortByDate()),
  dispatchSetEndDate: (endDate) => dispatch(setEndDate(endDate)),
  dispatchSetStartDate: (startDate) => dispatch(setStartDate(startDate)),
});

ExpenseListFilters.propTypes = {
  filters: PropTypes.shape({
    text: PropTypes.string,
    sortyBy: PropTypes.string,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }).isRequired,
  dispatchSetEndDate: PropTypes.func.isRequired,
  dispatchSetStartDate: PropTypes.func.isRequired,
  dispatchSetTextFilter: PropTypes.func.isRequired,
  dispatchSortByAmount: PropTypes.func.isRequired,
  dispatchSortByDate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
