import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import todoSlice from "./todoSlice";
import rootSaga from "../sagas/rootSaga";

// тут сага чето свое создает, я хуй знает, спроси у гпт
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
  // подключение саги к редаксу
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// тут тоже чето у саги, ну видимо запуск работы
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
