import checked from "../assets/checked.svg";
import { useAppDispatch } from "../store/store";
import { deleteTodo, toggleTodoStatus } from "../store/todoSlice";

export type Todo = {
  id: number;
  isChecked: boolean;
  text: string;
};

interface TodoProps {
  todo: Todo;
}

export const Todo = ({ todo }: TodoProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="todo">
        <div
          className="todo-btn"
          onClick={() => dispatch(toggleTodoStatus(todo.id))}
        >
          {todo.isChecked && (
            <img src={checked} alt="Галочка" className="todo-icon" />
          )}
        </div>
        <span className="todo-text">{todo.text}</span>
        <button
          className="todo-delete"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          Удалить
        </button>
      </div>
    </>
  );
};
