import { useState } from "react";

export interface ProductsData {
  name: string;
  brand: string;
  quantity: number;
  description: string;
  category: string;
  imgUrl: string;
}

export default function Products() {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const fetchProducts = async () => {
    const res = fetch("http://localhost:3000/api/client/getProducts");
    const data = (await res).json();
    console.log(data);
    setProducts(await data);
  };
  return (
    <div>
      <p>products:</p>
      {products.map((product) => (
        <div>
          {product.brand}
          <div>
            {product.name}
            {product.description}
            {product.category}
            {product.quantity}
          </div>
        </div>
      ))}
    </div>
  );
}
