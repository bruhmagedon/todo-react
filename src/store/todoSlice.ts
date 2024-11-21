import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../components/Todo";

export const TODOS_KEY = "TODOS";

export interface TodoState {
  todos: Todo[];
  todoName: string;
  todoLength: number;
  loading: boolean;
  error?: string;
}

const initialState: TodoState = {
  todos: [],
  todoName: "",
  todoLength: 0,
  loading: false,
  error: undefined,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Тут просто переключаются статусы запроса к Api-шке

    // типа начало запроса (loading = true)
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    // запрос успешен - поместили данные в state (в данном случае в todos)
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loading = false;
    },
    // типа ошибка
    fetchTodosFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTodoStatus: (state, action: PayloadAction<number>) => {
      const updateTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      state.todos = updateTodos;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  deleteTodo,
  toggleTodoStatus,
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailed,
} = todoSlice.actions;

export default todoSlice.reducer;
