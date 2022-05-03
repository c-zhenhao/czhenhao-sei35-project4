import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetails from "../components/ProductDetails";

import products from "../fedata/product";

export default function ProductPage() {
  const [product, setProduct] = useState([]);

  let { id } = useParams();

  function getProductDetails() {
    // api call to get product

    // for now use static data
    setProduct(products[id - 1]);
  }

  useEffect(() => {
    getProductDetails();
  });

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
}
