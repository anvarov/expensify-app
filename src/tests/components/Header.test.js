import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../components/Header";

test("should render header component correctly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
  const dispatchStartLogoutSpy = jest.fn();
  const wrapper = shallow(
    <Header dispatchStartLogout={dispatchStartLogoutSpy} />
  );
  wrapper.find("button").simulate("click");
  expect(dispatchStartLogoutSpy).toBeCalledTimes(1);
});
