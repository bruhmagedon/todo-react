import { all } from "redux-saga/effects";
import { watchTodoSaga } from "./todoSaga";

export default function* rootSaga() {
  yield all([watchTodoSaga()]);
}
