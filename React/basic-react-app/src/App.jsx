import "./App.css";
import Title from './Title.jsx';
import ProductTab from "./ProductTab.jsx";
import MsgBox from "./MsgBox.jsx";

function App() {
 return (
  <>
    <MsgBox userName="RadheSham Tiwari" textColor="red" />
    <ProductTab />
    <Title />
  </>
 );
}

export default App;
