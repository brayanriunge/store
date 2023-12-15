import Image from "next/image";
import { useEffect, useState } from "react";

export interface ProductsData {
  name: string;
  brand: string;
  quantity: number;
  description: string;
  category: string;
  imgUrl: string;
  price: number;
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
    <section className="grid grid-cols-4">
      <p>products:</p>
      {products.map((product) => (
        <>
          <div className=" flex flex-col items-center justify content-between gap-8 rounded-md shadow-sm">
            <div className="rounded-md">
              <Image
                src={product.imgUrl}
                alt="image"
                height={240}
                width={240}
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-bold text-lg ">Name:</h1>
              <p className="text-md">{product.name}</p>
            </div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-bold text-lg ">Brand:</h1>
              <p className="text-md">{product.brand}</p>
            </div>
            <div
              className="flex items-start
             justify-between gap-4"
            >
              <h1 className="text-bold text-lg ">Description:</h1>
              <p className="text-md">{product.description}</p>
            </div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-bold text-lg ">Price:</h1>
              <p className="text-md">
                {" "}
                <span>KSH</span>
                {""}
                {product.price}
              </p>
            </div>
          </div>
        </>
      ))}
    </section>
  );
}
