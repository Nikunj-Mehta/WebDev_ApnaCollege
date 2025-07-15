import { useState } from "react"
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddForm() {
  const [task, setTask] = useState("");
  const dispach = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(task);
    dispach(addTodo(task)); // in addTodo in todoSlice.js file it takes task as a payload and rest of todo things are present by default.
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={(e) => setTask(e.target.value)} />
        <button>Add Task</button>
      </form>
    </>
  )
}