import React from "react";
import { shallow } from "enzyme";
import { DateRangePicker } from "react-dates";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let wrapper;
let onSetEndDateSpy;
let onSetStartDateSpy;
let onChangeSortTypeByAmountSpy;
let onChangeSortTypeByDateSpy;
let onSetTextFilterSpy;

beforeEach(() => {
  onSetEndDateSpy = jest.fn();
  onSetStartDateSpy = jest.fn();
  onChangeSortTypeByAmountSpy = jest.fn();
  onChangeSortTypeByDateSpy = jest.fn();
  onSetTextFilterSpy = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      dispatchSetTextFilter={onSetTextFilterSpy}
      dispatchSortByAmount={onChangeSortTypeByAmountSpy}
      dispatchSortByDate={onChangeSortTypeByDateSpy}
      dispatchSetEndDate={onSetEndDateSpy}
      dispatchSetStartDate={onSetStartDateSpy}
      filters={filters}
    />
  );
}, 500);

test("should render correctly when filters passed to component", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render correctly when altFilters passed to component", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("should onDatesChange to be called correctly", () => {
  wrapper.find(DateRangePicker).prop("onDatesChange")(filters);
  expect(onSetEndDateSpy).toHaveBeenLastCalledWith(filters.endDate);
  expect(onSetStartDateSpy).toHaveBeenLastCalledWith(filters.startDate);
});

test("should onChangeSortTypeByAmout to be called correctly", () => {
  wrapper.find("select").simulate("change", { target: { value: "date" } });
  expect(onChangeSortTypeByDateSpy).toHaveBeenCalledTimes(1);
  expect(onChangeSortTypeByAmountSpy).toHaveBeenCalledTimes(0);
});

test("should onChangeSortTypeByDate to be called correctly", () => {
  wrapper.find("select").simulate("change", { target: { value: "amount" } });
  expect(onChangeSortTypeByDateSpy).toHaveBeenCalledTimes(0);
  expect(onChangeSortTypeByAmountSpy).toHaveBeenCalledTimes(1);
});

test("should onSetTextFilter to be called correctly", () => {
  const testString = "test value";
  wrapper.find("input").simulate("change", { target: { value: testString } });
  expect(onSetTextFilterSpy).toHaveBeenCalledWith(testString);
});
