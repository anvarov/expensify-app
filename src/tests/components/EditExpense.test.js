import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpense";
import expenses from "../fixtures/expenses";

test("should render edit expense page correctly", () => {
  const wrapper = shallow(<EditExpensePage expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should onClick be called correctly", () => {
  const onClickSpy = jest.fn();
  const historySpy = { push: jest.fn() };
  const wrapper = shallow(
    <EditExpensePage
      onClick={onClickSpy}
      expense={expenses[0]}
      history={historySpy}
    />
  );
  wrapper.find("button").simulate("click");
  expect(onClickSpy).toHaveBeenLastCalledWith(expenses[0].id);
  expect(historySpy.push).toHaveBeenLastCalledWith("/");
});
