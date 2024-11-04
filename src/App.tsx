import { observer } from "mobx-react-lite";
import "./App.css";
import { Todo } from "./components/Todo";
import { todoStore } from "./store/store";

const App = observer(() => {
  const { todos, todoName, changeNameInput, createTodo } = todoStore;

  return (
    <>
      <h1>Список задач</h1>
      <div className="todo-list">
        <div className="todo-list-add">
          <input
            placeholder="Название добавляемой задачи"
            value={todoName}
            className="todo-list-add-input"
            onChange={(e) => changeNameInput(e.target.value)}
          />
          <button className="todo-list-add-btn" onClick={createTodo}>
            Добавить задачу
          </button>
        </div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
});

export default App;
