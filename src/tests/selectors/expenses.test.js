import moment from "moment";
import selectExpense from "../../selectors/expenses";

const expenses = [
  { id: "1", description: "gum", amount: 145, createdAt: 0 },
  {
    id: "2",
    description: "coke",
    amount: 1459,
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: "3",
    description: "credit card",
    amount: 12000,
    createdAt: moment(0).subtract(8, "days").valueOf(),
  },
  {
    id: "4",
    description: "rent",
    amount: 445000,
    createdAt: moment(0).subtract(12, "days").valueOf(),
  },
];

test("should filter by text value", () => {
  const filters = {
    text: "e",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpense(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[3]]);
});

test("should filter by start date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined,
  };
  const result = selectExpense(expenses, filters);
  expect(result).toEqual([expenses[0]]);
});

test("should filter by end date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0).subtract(5, "days"),
  };
  const result = selectExpense(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[3]]);
});

test("should sort by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpense(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1], expenses[2], expenses[3]]);
});

test("should sort by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpense(expenses, filters);
  expect(result).toEqual([expenses[3], expenses[2], expenses[1], expenses[0]]);
});
