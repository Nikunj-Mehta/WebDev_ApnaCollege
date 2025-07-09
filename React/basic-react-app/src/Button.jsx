function handelClickPrintHello(event) {
  console.log("Hello!");
  console.log(event);
}

function handelClickPrintBye() {
  console.log("Bye!");
}

function handleMouseOver() {
  console.log("hovered");
}

function handleDbClick() {
  console.log("you double clicked");
}

export default function Button() {
  return(
    <div>
      <button onClick={handelClickPrintHello}>Click me!</button>
      <p onClick={handelClickPrintBye}>This parah is for event demo</p>
      <p onMouseOver={handleMouseOver}>Non click event demo</p>
      <button onDoubleClick={handleDbClick}>Double click Here!</button>
    </div>
  )
}