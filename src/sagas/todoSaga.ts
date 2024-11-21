import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchTodosSuccess,
  fetchTodosFailed,
  fetchTodosStart,
} from "../store/todoSlice";
import axios from "axios";
import { Todo } from "../components/Todo";

function fetchTodosApi(): Promise<{ data: Todo[] }> {
  return axios.get("https://jsonplaceholder.typicode.com/todos?_limit=100");
}

function* fetchTodosSaga(): Generator<unknown, void, { data: Todo[] }> {
  try {
    const response: { data: Todo[] } = yield call(fetchTodosApi);
    yield put(fetchTodosSuccess(response.data));
  } catch (e) {
    yield put(fetchTodosFailed("Ошибка при получении задач"));
  }
}

export function* watchTodoSaga() {
  yield takeEvery(fetchTodosStart.type, fetchTodosSaga);
}
