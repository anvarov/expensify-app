import database from "../firebase/firebase";

// ADD_EXPENSE

export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

// START_ADD_EXPENSE

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = {
      description,
      note,
      amount,
      createdAt,
    };
    return database
      .ref("expenses")
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        );
      });
  };
};

// REMOVE_EXPENSE

export const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// START_REMOVE_EXPENSE
export const startRemoveExpense = ({ id }) => {
  return (dispatch) => {
    return database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

// EDIT_EXPENSE

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// START_EDIT_EXPENSES

export const startEditExpenses = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`expenses/${id}`)
      .set(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

// SET_EXPENSES
// fired first when app is loadad for fetching data from firebase
export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

// START_EXPENSES

export const startSetExpenses = () => {
  return (dispatch) => {
    return database
      .ref("expenses")
      .once("value")
      .then((snapshot) => {
        const expenses = [];
        const fetchedExpenses = snapshot.val();
        if (fetchedExpenses) {
          const fetchedExpensesKeys = Object.keys(fetchedExpenses);
          fetchedExpensesKeys.forEach((expenseId) => {
            expenses.push({ id: expenseId, ...fetchedExpenses[expenseId] });
          });
        }
        dispatch(setExpenses(expenses));
      });
  };
};
