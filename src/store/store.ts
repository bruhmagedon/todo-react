import { makeAutoObservable, reaction } from "mobx";

export type Todo = {
  id: number;
  isChecked: boolean;
  text: string;
};

export const TODOS_KEY = "TODOS";

class TodoStore {
  todos: Todo[] = [];
  todoName: string = "";
  todoLength: number = 0;

  constructor() {
    makeAutoObservable(this);

    const storedTodos = localStorage.getItem(TODOS_KEY);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.todoLength = this.todos.length;
    }

    reaction(
      () => this.todos.slice(),
      (todos) => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
      }
    );
  }

  createTodo = () => {
    if (this.todoName) {
      const newTodo = {
        id: this.todoLength + 1,
        text: this.todoName,
        isChecked: false,
      };
      this.todos.push(newTodo);
      this.todoName = "";
      this.todoLength += 1;
    }
  };

  toggleTodoStatus = (id: number) => {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isChecked = !todo.isChecked;
    }
  };

  deleteTodo = (id: number) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  changeNameInput = (name: string) => {
    this.todoName = name;
  };
}

export const todoStore = new TodoStore();
