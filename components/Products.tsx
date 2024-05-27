import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import StoreItem from "./StoreItems";

export default function Products() {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/client/getProduct");
    const data = (await res).json();
    console.log(data);
    setProducts(await data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="grid grid-cols-4 gap-6 pt-32 p-5">
      {products.map((product) => (
        <>
          <div key={product.id}>
            <StoreItem {...product} />
          </div>
        </>
      ))}
    </section>
  );
}
