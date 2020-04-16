import moment from "moment";
import expenseReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expenseReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should add expense to state", () => {
  const addExpense = {
    type: "ADD_EXPENSE",
    expense: {
      id: 5,
      description: "test entry",
      note: "this is note",
      createdAt: moment(0).add(10, "days").valueOf(),
      amount: 200,
    },
  };
  const state = expenseReducer(expenses, addExpense);
  expect(state).toEqual([...expenses, addExpense.expense]);
});

test("should remove expense from state", () => {
  const state = expenseReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: expenses[0].id,
  });
  expect(state).toEqual([expenses[1], expenses[2], expenses[3]]);
});

test("should not remove expense if id doesn't match", () => {
  const state = expenseReducer(expenses, { type: "REMOVE_EXPENSE", id: -1 });
  expect(state).toEqual(expenses);
});

test("should  edit expense if id matches", () => {
  const state = expenseReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: { description: "gummy bar" },
  });
  expect(state[0].description).toBe("gummy bar");
});

test("should not edit expense if id doesn't match", () => {
  const state = expenseReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: undefined,
    updates: { description: "this should not be updated!" },
  });
  expect(state).toEqual(expenses);
});
