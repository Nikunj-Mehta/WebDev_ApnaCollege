import "./Product.css";
import Price from "./Price";"./Price.jsx"

function Product({title, idx}) { //  we can destructure the fields as we know props come as object. We can pass default values to props as well
  let oldPrice = ["12,495", "11,900", "1,599", "599"];
  let newPrice = ["8,999", "9,199", "899", "278"];
  let description = [
    ["8,000 DPI", "5 Programmable buttons"], 
    ["intuitive surface", "designed for iPad Pro"], 
    ["designed for iPad Pro", "intuitive surface"], 
    ["wireless", "optical oriented"]
  ];
  return (
    <div className="Product">
      <h4>{title}</h4>
      <ul>
        <li>{description[idx][0]}</li>
        <li>{description[idx][1]}</li>
      </ul>
      <Price oldPrice={oldPrice[idx]} newPrice={newPrice[idx]} />
    </div>
  );
}

export default Product; 