import "./App.css";
import ProductTab from "./ProductTab.jsx";
import Button from "./Button.jsx"
import Form from "./Form.jsx"
import Title from "./Title.jsx";
import MsgBox from "./MsgBox.jsx";
function App() {
 return (
  <>
    <Title />
    <h2>Blockbuster Deals | Shop Now</h2>
    <ProductTab /> 
    <Button />
    <Form />
    <MsgBox userName="Nikunj" textColor="red" />
  </>
 );
}

export default App;
