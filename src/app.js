import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import "normalize.css";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "./firebase/firebase";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

store
  .dispatch(startSetExpenses())
  .then(() => {
    ReactDOM.render(jsx, document.getElementById("app"));
  })
  .catch((error) => {
    ReactDOM.render(<p>{`Sorry error - ${error} has occured`}</p>);
  });
