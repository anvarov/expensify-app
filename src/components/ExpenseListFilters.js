import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setTextFilter, sortByAmount, sortByDate } from "../actions/filters";

const ExpenseListFilters = (props) => {
  const { dispatch, filters } = props;
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
          e.target.value === "date"
            ? dispatch(sortByDate())
            : dispatch(sortByAmount());
        }}
      >
        <option value="date">Date</option>
        <option value="value">Amount</option>
      </select>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filters: state.filters,
});

ExpenseListFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExpenseListFilters);
