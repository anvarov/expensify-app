export default (expenses) =>
  expenses.reduce(
    (accumulator, expense) => (accumulator += parseFloat(expense.amount / 10)),
    0
  );
