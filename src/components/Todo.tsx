import checked from "../assets/checked.svg";

export type Todo = {
  id: number;
  isChecked: boolean;
  text: string;
};

interface TodoProps {
  todo: Todo;
  onDeleteTodo: (id: number) => void;
  onToggleTodo: (id: number) => void;
}

export const Todo = ({ todo, onDeleteTodo, onToggleTodo }: TodoProps) => {
  return (
    <>
      <div className="todo">
        <div className="todo-btn" onClick={() => onToggleTodo(todo.id)}>
          {todo.isChecked && (
            <img src={checked} alt="Галочка" className="todo-icon" />
          )}
        </div>
        <span className="todo-text">{todo.text}</span>
        <button className="todo-delete" onClick={() => onDeleteTodo(todo.id)}>
          Удалить
        </button>
      </div>
    </>
  );
};
