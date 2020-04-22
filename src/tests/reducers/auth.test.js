import authReducer from "../../reducers/auth";
import { login, logout } from "../../actions/auth";

test("should handle @@INIT action", () => {
  const action = { type: "@@INIT" };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});

test("should handle login action", () => {
  const loginAction = login("someuid");
  const state = authReducer(undefined, loginAction);
  expect(state).toEqual({
    uid: "someuid",
  });
});

test("should handle logout action", () => {
  const logoutAction = logout();
  const state = authReducer({ uid: "someuid" }, logoutAction);
  expect(state).toEqual({});
});
