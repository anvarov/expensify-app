import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../components/ExpenseSummary";

let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <ExpenseSummary expenseTotal={1500} expenseTotalNumber={2} />
  );
}, 500);

test("should render ExpenseSummary page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should return <viewing 1 expense totaling n amount>, when expense is only one", () => {
  wrapper.setProps({ expenseTotal: 100, expenseTotalNumber: 1 });
  expect(wrapper).toMatchSnapshot();
});
