import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpense";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let onSubmitFormSpy;
let onClickSpy;
let historySpy;
let wrapper;

beforeEach(() => {
  onSubmitFormSpy = jest.fn();
  onClickSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      onClick={onClickSpy}
      expense={expenses[0]}
      history={historySpy}
      onSubmitForm={onSubmitFormSpy}
    />
  );
}, 500);
test("should render edit expense page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should onClick be called correctly", () => {
  wrapper.find("button").simulate("click");
  expect(onClickSpy).toHaveBeenLastCalledWith(expenses[0].id);
  expect(historySpy.push).toHaveBeenLastCalledWith("/");
});

test("should onFormSubmit be called properly", () => {
  wrapper.find(ExpenseForm).prop("onSubmitForm")(expenses[0]);
  expect(onSubmitFormSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
  expect(historySpy.push).toHaveBeenLastCalledWith("/");
});
