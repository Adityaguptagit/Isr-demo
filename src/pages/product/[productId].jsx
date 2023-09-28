// import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductId({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <div>Hello div</div>
      <div>
        <ul>
          <li>Product Id: {product.id}</li>
          <li>Product Title: {product.title}</li>
          <li>Product Price: {product.price}</li>
          <li>Product Description: {product.description}</li>
        </ul>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          productId: "1",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {params} = context;

  console.log("Get Static Props revalidate Calling Again for Id:" + params.ProductId);

  const res = await fetch(`http://localhost:3430/products/${params.productId}`);
  const data = await res.json();

  return {
    props: {
      product: data,
    },
    revalidate:5,
  };
}
