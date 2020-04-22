import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../components/LoginPage";

test("should render correctly login page component", () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogin on button click", () => {
  const dispatchStartLoginSpy = jest.fn();
  const wrapper = shallow(
    <LoginPage dispatchStartLogin={dispatchStartLoginSpy} />
  );
  wrapper.find("button").simulate("click");
  expect(dispatchStartLoginSpy).toBeCalledTimes(1);
});
