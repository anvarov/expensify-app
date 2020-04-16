import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should setup editExpense action object", () => {
  const updates = {
    description: "this is test",
    createdAt: 1241,
  };
  const action = editExpense("123abc", updates);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "this is test",
      createdAt: 1241,
    },
  });
});

test("should setup addExpense object with provided values", () => {
  const expenseDate = {
    description: "Rent",
    amount: 5000,
    createdAt: 1000,
    note: "this was last month rent",
  };
  const action = addExpense(expenseDate);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: { ...expenseDate, id: expect.any(String) },
  });
});

test("should setup addExpense object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      createdAt: 0,
      amount: 0,
    },
  });
});
