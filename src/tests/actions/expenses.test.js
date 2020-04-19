import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import "regenerator-runtime/runtime";
import database from "../../firebase/firebase";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);

console.log(process.env.NODE_ENV)

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should setup editExpense action object", () => {
  const updates = {
    description: "this is test",
    createdAt: 1241,
  };
  const action = editExpense("123abc", updates);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "this is test",
      createdAt: 1241,
    },
  });
});

test("should setup addExpense object with provided values", () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[0],
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "mouse",
    amount: 3000,
    note: "this is better",
    createdAt: 123,
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: { id: expect.any(String), ...expenseData },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should setup add expense action object with default value", (done) => {
  const store = createMockStore();
  const defaultExpense = {
    description: "",
    note: "",
    createdAt: 0,
    amount: 0,
  };

  store
    .dispatch(startAddExpense(defaultExpense))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: { id: expect.any(String), ...defaultExpense },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultExpense);
      done();
    });
});
// test("should setup addExpense object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       createdAt: 0,
//       amount: 0,
//     },
//   });
// });
