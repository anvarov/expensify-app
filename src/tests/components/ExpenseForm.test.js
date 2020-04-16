import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render expense form correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render expense form with provided data", () => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const wrapper = shallow(<ExpenseForm {...expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error with invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(wrapper.state(["error"])).toBe(
    "Please provide description and amount"
  );
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "Description is changed";
  wrapper.find("input").at(0).simulate("change", { target: { value } });
  expect(wrapper.state(["description"])).toBe(value);
});

test("should set note on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "this is a test note";
  wrapper
    .find("form")
    .find("textarea")
    .simulate("change", { target: { value } });
  expect(wrapper.state(["note"])).toBe(value);
});

test("should set amount if input is valid", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "12312";
  wrapper.find("input").at(1).simulate("change", { target: { value } });
  expect(wrapper.state(["amount"])).toBe(value);
});

test("should not set amount with invalid input", () => {
  const wrapper = shallow(<ExpenseForm />);
  let value = "invalidInput";
  wrapper.find("input").at(1).simulate("change", { target: { value } });
  expect(wrapper.state(["amount"])).toBe("");
  value = "23,34343";
  expect(wrapper.state(["amount"])).toBe("");
  value = "-12312";
  expect(wrapper.state(["amount"])).toBe("");
  value = ".12312";
  expect(wrapper.state(["amount"])).toBe("");
});
