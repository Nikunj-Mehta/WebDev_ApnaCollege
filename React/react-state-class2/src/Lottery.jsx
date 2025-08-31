import { useState } from "react";
import { generateTicket, sum } from "./helper";
import Ticket from "./Ticket.jsx";
import Button from "./Button.jsx"

export default function Lottery({ n = 3, winCondition }) {
  let [ticket, setTicket] = useState(generateTicket(n)); // Ticket is an array of size n or by default 3.
  let isWinning = winCondition(ticket);

  let buyTicket = () => {
    setTicket(generateTicket(n)); // can write generateTicket() as well
  };

  return (
    <div>
      <h2>Lottery Game</h2>
      <Ticket ticket={ticket} />
      <Button action={buyTicket} />
      <h3>{isWinning && "Congratulations, you won!"}</h3>
    </div>
  )
}