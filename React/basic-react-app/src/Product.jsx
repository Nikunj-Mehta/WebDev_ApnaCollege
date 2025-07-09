import "./Product.css";

function Product({ title, price = 10, features, features2, features3, features4 }) { //  we can destructure the fields as we know props come as object. We can pass default values to props as well
  // const list = features2.map((feature) => <li>{feature}</li>);  // instead of defining here use it directly below
  let isDiscount = price > 30000;
  let styles = { backgroundColor: isDiscount ? "yellow" : null };

  return (
    <div className="Product" style={styles}>
      <h3>{title}</h3>
      <h5>Price: {price}</h5>
      {isDiscount && <p style={{color:'red'}}>Discount: 5%</p>}
    </div>
  );
}

export default Product;