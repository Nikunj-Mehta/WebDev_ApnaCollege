import { useState } from "react";

function init() {
  console.log("init was executed");
  return Math.random();
}

export default function Counter() {
  let [count, setCount] = useState(init); // initialization (this line is ignored in re-rendering); We can call function too.
  console.log("Component is rendered");
  console.log("Count = " + count); // The value of count is updated in rendered stage and not in function therefor we see the same value inside incCount function.

  let incCount = () => {
    // setCount(count+1); // This is an asynchronous function
    // setCount(count+1); // the count will be increased by 1 only, it doesn't matter how many times we call this function
    // setCount(count+1); // Therefore we will use callbacks for this to get expected behaviour.
     console.log(`Inside incCount before, count: _${count}`); // This will be always 1 less than what is printed because state re-renders in a way in which we see this behaviour. This is because react never interferes between the function once this function will complete it's execution then only we will see updated value

    // using arrow function is callback now the counter will increase by 2.(or by n depending on how many times we use callbacks.)
    // Doing this will make our asynchronous function synchronous.
    setCount((currCount) => {
      return currCount + 1;
    });
    setCount((currCount) => {
      return currCount + 1;
    });
    setCount((currCount) => {
      return currCount + 1;
    });
    console.log(`Inside incCount, count: _${count}`); // This will be always 1 less than what is printed because state re-renders in a way in which we see this behaviour. we will the value before updation because first this function will complete it's execution and then it will re-render.

    // setCount(64); // There will be no re-rendering if we will execute only this line because there is no change in state value
  };

  // If I write console.log() in here then we can see new updated value. As re-rendering is done when the function incCount ended.

  return (
    <div>
      <h3>Count = {count}</h3>
      <button onClick={incCount}>Increase Count</button>
    </div>
  )
}