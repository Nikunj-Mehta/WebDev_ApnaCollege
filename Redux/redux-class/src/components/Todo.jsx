import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import { useDispatch } from "react-redux";
import { deleteTodo, markAsDone } from "../features/todo/todoSlice";

export default function Todo() {
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const dispach = useDispatch();

  const clickHandler = (id) => {
    console.log("delete", id);
    dispach(deleteTodo(id)); // pass this id to delete todo and see the todoSlice.js file deleteTodo takes id as a payload.
  }

  const handleDone = (id) => {
    console.log("completed", id);
    dispach(markAsDone(id));
  }
  return (
    <>
      <AddForm />
      <h2>Todo List App</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>
            {todo.task}
            <button onClick={() => clickHandler(todo.id)}>Delete</button>
            <button onClick={() => handleDone(todo.id)} >Mark As Done</button>
          </li>
          ))}
      </ul>
    </>
  )
}