import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import "normalize.css";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

const store = configureStore();
store.dispatch(
  addExpense({ description: "this is test", amount: 1550, createdAt: 123 })
);
store.dispatch(
  addExpense({ description: "water bill", amount: 600, createdAt: 13 })
);
store.dispatch(
  addExpense({ description: "rent", amount: 550, createdAt: 1131 })
);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
