import { Description } from "./Description";
function Title() {
  let name = "Nikunj";
  return (
    <div>
      <h1>I am title!</h1>
      <p>Hi, {name.toUpperCase()}</p>
      <Description />
      <p>2 * 2 = {2*2}</p>
      <button>Click Me!</button>
    </div>
  );
}

export default Title; // Default Export