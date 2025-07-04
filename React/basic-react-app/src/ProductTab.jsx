import Product from "./Product.jsx"

function ProductTab() {
  let options = [<li>"hi-tech"</li>, <li>"durable"</li>, <li>"fast"</li>];
  let options2 = { a: "hi-tech", b: "durable", c: "fast" };
  return (
    <>
      <Product title="phone" price={30000} features={options} features2={["hi-tech", "durable"]} features3={{a: "hi-tech", b: "durable"}} />
      {/* <Product title="laptop" price={40000}  />
      <Product title="pen" price={1} /> */}
    </>
  );
}

export default ProductTab;