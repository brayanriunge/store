import { useState } from "react";

export interface ProductsData {
  name: string;
  brand: string;
  quantity: number;
  description: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const fetchProducts = async () => {
    const res = fetch("http://localhost:3000/api/client/getProducts");
    const data = (await res).json();
    console.log(data);
    setProducts(await data);
  };
  return <div></div>;
}
