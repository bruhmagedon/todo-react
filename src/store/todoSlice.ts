import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../components/Todo";

export const TODOS_KEY = "TODOS";

export interface TodoState {
  todos: Todo[];
  todoName: string;
  todoLength: number;
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem(TODOS_KEY) ?? "[]"),
  todoName: "",
  todoLength: 0,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state) => {
      if (state.todoName) {
        state.todos = [
          ...state.todos,
          {
            id: state.todoLength + 1,
            text: state.todoName,
            isChecked: false,
          },
        ];
        state.todoName = "";
        state.todoLength += 1;
      }
    },
    toggleTodoStatus: (state, action: PayloadAction<number>) => {
      const updateTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.isChecked = !todo.isChecked;
        }
        return todo;
      });
      state.todos = updateTodos;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    changeNameInput: (state, action: PayloadAction<string>) => {
      state.todoName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createTodo, changeNameInput, deleteTodo, toggleTodoStatus } =
  todoSlice.actions;

export default todoSlice.reducer;
