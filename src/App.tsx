import { useEffect } from "react";
import "./App.css";
import { Todo } from "./components/Todo";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchTodosStart } from "./store/todoSlice";

function App() {
  // вот тута получаем все данные с редакса, в который мы запихали данные с бека
  // тут ещё две переменные чтобы отрисовать надписи пока данные грузятся или при их ошибке
  const { todos, loading, error } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // запрос к серверу через сагу
    dispatch(fetchTodosStart());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка данных с API...</p>;
  }

  if (error) {
    return <p>Ошибка при получении данных: {error}</p>;
  }

  return (
    <>
      <h1>Список задач из Api</h1>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default App;
