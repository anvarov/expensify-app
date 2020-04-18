import getExpenseTotal from "../../selectors/expensesTotal";
import expenses, { noExpense, singleExpense } from "../fixtures/expenses";

test("should return total amount of expenses ", () => {
  const total = getExpenseTotal([expenses[0], expenses[1]]);
  expect(total).toBe((expenses[0].amount + expenses[1].amount) / 10);
});

test("should return 0 if there is no expense", () => {
  const total = getExpenseTotal(noExpense);
  expect(total).toBe(0);
});

test("should return single expense total", () => {
  const total = getExpenseTotal(singleExpense);
  expect(total).toBe(parseFloat(singleExpense[0].amount) / 10);
});
