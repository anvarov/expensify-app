import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import "regenerator-runtime/runtime";
import database from "../../firebase/firebase";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  startSetExpenses,
  startRemoveExpense,
  startEditExpenses,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import expenseReducer from "../../reducers/expenses";

const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);
const uid = "thisismytestid";
const defaultTestState = { auth: { uid } };
beforeEach((done) => {
  const expenseDataFirstLoad = {};
  expenses.forEach(({ id, description, note, createdAt, amount }) => {
    expenseDataFirstLoad[id] = { description, note, createdAt, amount };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expenseDataFirstLoad)
    .then(() => done());
});

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
  const store = createMockStore(defaultTestState);
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
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should setup add expense action object with default value", (done) => {
  const store = createMockStore(defaultTestState);
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
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultExpense);
      done();
    });
});

test("should setup set expenses action object with data", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: expenses[1],
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses[1]);
});

test("should fetch data from firebase and set expenses", (done) => {
  const store = createMockStore(defaultTestState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});

test("should call remove expense action correctly and delete expense from firebase", (done) => {
  const store = createMockStore(defaultTestState);
  store
    .dispatch(startRemoveExpense(expenses[0]))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id: actions[0].id,
      });
    })
    .then(() => {
      return database
        .ref(`users/${uid}/expenses/${expenses[0].id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should set up edit expense action and update expense on firebase", (done) => {
  const updates = {
    note: "new note",
    createdAt: 1234,
    description: "updated description",
    amount: 1250,
  };
  const store = createMockStore(defaultTestState);
  const actions = store.getActions();
  const { id } = expenses[0];
  store
    .dispatch(startEditExpenses(id, updates))
    .then(() => {
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(updates);
      done();
    });
});
