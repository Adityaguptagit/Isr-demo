export default function Product({ products }) {
  return (
    <>
      <h1>List of Product</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <ul>
              <li>Product Id: {product.id}</li>
              <li>Product Title: {product.title}</li>
              <li>Product Price: {product.price}</li>
            </ul>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps() {

  console.log("Get Static Props revalidate Calling Again");
  
  const res = await fetch("http://localhost:3430/products");
  const data = await res.json();
  
  return {
    props: {
      products: data,
    },
    revalidate:5,
  };
}



/*Note: if we make changes in products.json and if we already run the build command then it will show old data bcz we need to rebuild the application again to resolve but instead of this process there is a concept came known as ISR (Incremental Static Regeneration): There was need to update onyl those pages which needed a change without having to rebuild the entire app again and again

*How to implement ISR
In the getStaticProps function,apart from the props key,we can specify a 'revalidate' key*/
