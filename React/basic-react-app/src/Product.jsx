import "./Product.css";

function Product({ title, price, features, features2, features3 }) { // instead of using props here we destructure the fields as we know props come as object. We can pass default values to props as well
  // const list = features2.map((feature) => <li>{feature}</li>);  // instead of defining here use it directly below
  return (
    <div className="Product">
      <h3>{title}</h3>
      <h5>Price: {price}</h5>
      <p>{features}</p>
      <p>{features2.map((feature) => <li>{feature}</li>)}</p> 
      <p>{features3.a}</p>
    </div>
  );
}

export default Product;