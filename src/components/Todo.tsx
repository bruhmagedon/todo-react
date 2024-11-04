import { observer } from "mobx-react-lite";
import checked from "../assets/checked.svg";
import { todoStore } from "../store/store";

export type TodoType = {
  id: number;
  isChecked: boolean;
  text: string;
};

interface TodoProps {
  todo: TodoType;
}

export const Todo = observer(({ todo }: TodoProps) => {
  const { toggleTodoStatus, deleteTodo } = todoStore;

  return (
    <>
      <div className="todo">
        <div className="todo-btn" onClick={() => toggleTodoStatus(todo.id)}>
          {todo.isChecked && (
            <img src={checked} alt="Галочка" className="todo-icon" />
          )}
        </div>
        <span className="todo-text">{todo.text}</span>
        <button className="todo-delete" onClick={() => deleteTodo(todo.id)}>
          Удалить
        </button>
      </div>
    </>
  );
});
