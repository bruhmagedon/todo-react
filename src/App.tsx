import { useEffect } from "react";
import "./App.css";
import { Todo } from "./components/Todo";
import { useAppDispatch, useAppSelector } from "./store/store";
import { changeNameInput, createTodo, TODOS_KEY } from "./store/todoSlice";

function App() {
  const todos = useAppSelector((state) => state.todos.todos);
  const todoName = useAppSelector((state) => state.todos.todoName);

  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1>Список задач</h1>
      <div className="todo-list">
        <div className="todo-list-add">
          <input
            placeholder="Название добавляемой задачи"
            value={todoName}
            className="todo-list-add-input"
            onChange={(e) => dispatch(changeNameInput(e.target.value))}
          />
          <button
            className="todo-list-add-btn"
            onClick={() => dispatch(createTodo())}
          >
            Добавить задачу
          </button>
        </div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default App;
