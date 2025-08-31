import { useState, useEffect } from "react"

export default function Counter () {
  let [countx, setCountx] = useState(0);
  let [county, setCounty] = useState(0);

  let incCountx = () => {
    setCountx((prevCount) => prevCount+1);
  };

   let incCounty = () => {
    setCounty((prevCount) => prevCount+1);
  };

  useEffect(function printSomething() {
    console.log("print something");
  }, [countx]); // passed dependencie as an array ie when this effect function should run when countx state variable changes. If countx changes it will execute of if we wirte [county] then it will exe whenever there is change in county.
  // if passed an empty array then it will execute only once and then even if state var value changes the fn will not execute.
  return (
    <div>
      <h3>Count = {countx}</h3>
      <button onClick={incCountx}>+1</button>

      <h3>Count = {county}</h3>
      <button onClick={incCounty}>+1</button>
    </div>
  )
}