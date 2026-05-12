import useTodoStore from "../store/todoStore";

function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <li
      style={{
        marginBottom: "10px",
      }}
    >
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => removeTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;