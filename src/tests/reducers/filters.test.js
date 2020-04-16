import moment from "moment";
import filtersReducer from "../../reducers/filters";

// At first start Redux makes @@INIT type action, have to test this first

test("should setup default values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sort by to date", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_DATE" });
  expect(state.sortBy).toBe("date");
});

test("should set sort by to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set start date", () => {
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: moment(0).valueOf(),
  });
  expect(state.startDate).toBe(moment(0).valueOf());
});

test("should set end date", () => {
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate: moment(0).valueOf(),
  });
  expect(state.endDate).toBe(moment(0).valueOf());
});

test("should setup text filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text: "gum",
  });
  expect(state.text).toBe("gum");
});
