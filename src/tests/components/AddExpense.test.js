import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpense";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let onSubmitForm;
let history;
let wrapper;
beforeEach(() => {
  onSubmitForm = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage onSubmitForm={onSubmitForm} history={history} />
  );
}, 500);

test("should render add expense page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find(ExpenseForm).prop("onSubmitForm")(expenses[0]);
  expect(onSubmitForm).toHaveBeenLastCalledWith(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
});
