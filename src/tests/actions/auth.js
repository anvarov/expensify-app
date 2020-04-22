import { login, logout } from "../../actions/auth";

test("should generate login action", () => {
  const action = login("someuid");
  expect(action).toEqual({
    type: "LOGIN",
    uid: "someuid",
  });
});

test("should generate logout action", () => {
  const action = logout();
  expect(action).toEqual({ type: "LOGOUT" });
});
