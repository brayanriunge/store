import Image from "next/image";
import { useEffect, useState } from "react";

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
    const res = fetch("http://localhost:3000/api/client/getProduct");
    const data = (await res).json();
    console.log(data);
    setProducts(await data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <p>products:</p>
      {products.map((product) => (
        <>
          <div>
            {product.brand}
            <div>
              {product.name}
              {product.description}
              {product.category}
              {product.quantity}
            </div>
            <Image src={product.imgUrl} alt="image" height={240} width={240} />
          </div>
        </>
      ))}
    </div>
  );
}
