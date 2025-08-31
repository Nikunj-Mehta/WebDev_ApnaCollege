import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [tasks, setTasks] = useState([{ todo: "sample-task", id: uuidv4(), isDone: false }]); // state Variable tasks is an array of objects.
  let [newTask, setNewTask] = useState("");

  let addNewTask = () => {
    setTasks((prevTodos) => {
      // console.log(newTask); // Here the new task value is exactly what is in input box. This is printed twice because react is in strict mode.
      return [...prevTodos, { todo: newTask, id: uuidv4(), isDone: false }]; // as it is copy of prev array with the new object added so there is change in state variable(as array) and hence re-rendering occurs.
    });
    setNewTask("");
    console.log(newTask); // Since input box is emptyed so it will print nothing. But we know react will make it empty only after the function ends so we will see the same value here too.
  }

  let updateTaskValue = (event) => {
    setNewTask(event.target.value); // newTask value will keep on changing on what you type
    // console.log(newTask); // This will show one character value less than the value in input box.
    // console.log(event.target.value) // But since we want all the values so we use this to get exactly what is typed in input box.
  };

  let deleteTodo = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id != id)); // filter method returns a new copy of all elements whose id is not equal to the id on which delete was clicked.
  };

  let doneAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        isDone: true,
      }))
    );
  };

  let doneOne = (id) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => {
        if(task.id == id) {
          return {...task, isDone: true};
        }
        else {
          return task;
        }
      })
    )
  };


  return (
    <div>
      <input placeholder="add a task" value={newTask} onChange={updateTaskValue}></input> &nbsp;
      <button onClick={addNewTask}>Add Task</button>
      <br></br> <br></br> <br></br>

      <hr></hr>
      <h4>Tasks to do</h4>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={task.isDone ? {textDecoration: "line-through"} : {} }>{task.todo}</span> &nbsp; &nbsp; &nbsp;
            <button onClick={() => deleteTodo(task.id)}>Delete</button> &nbsp; &nbsp;
            <button onClick={() => doneOne(task.id)}>Mark as done</button>
          </li>
        ))}
      </ul>
      <br></br>
      <button onClick={doneAll}>Mark all as done</button>
    </div>
  )
}