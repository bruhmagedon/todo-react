import { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo";

const TODOS_KEY = "TODOS";

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem(TODOS_KEY) ?? "[]")
  );
  const [todoName, setTodoName] = useState("");
  const [todoLength, setTodoLength] = useState(0);

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    if (todos.length > 0) {
      setTodoLength(todos[todos.length - 1].id);
    }
  }, [todos]);

  useEffect(() => {
    console.log(todoLength);
  }, [todoLength]);

  const createTodo = () => {
    if (todoName) {
      setTodos((todos) => [
        ...todos,
        {
          id: todoLength + 1,
          text: todoName,
          isChecked: false,
        },
      ]);
    }
    setTodoLength((todoLength) => todoLength + 1);

    setTodoName("");
  };

  const deleteTodo = (id: number) => {
    const deletedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodos);
  };

  const toggleTodoStatus = (id: number) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  return (
    <>
      <h1>Список задач</h1>
      <div className="todo-list">
        <div className="todo-list-add">
          <input
            placeholder="Название добавляемой задачи"
            value={todoName}
            className="todo-list-add-input"
            onChange={(e) => setTodoName(e.target.value)}
          />
          <button className="todo-list-add-btn" onClick={createTodo}>
            Добавить задачу
          </button>
        </div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodoStatus}
          />
        ))}
      </div>
    </>
  );
}

export default App;
