import './App.css';
import LudoBoard from './LudoBoard';
import TodoList from './TodoList';
import Lottery from './Lottery';
import { sum } from "./helper.js";

function App() {

  let winCondition = (ticket) => {
    return ticket.every((num) => num === ticket[0]); // Returns true if every number in ticket array is same.(Eg: 333)
  }

  return (
    <>
      <LudoBoard /> 
      <TodoList />
      <Lottery n={3} winCondition={winCondition} />
    </>
  )
}

export default App
