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
    <section className="grid grid-cols-4 gap-4 mt-32">
      {products.map((product) => (
        <>
          <div className=" flex flex-col  justify-between gap-2 items-start rounded-md shadow-sm  px-5">
            <div className=" w-full h-64 block rounded">
              <Image
                src={product.imgUrl}
                alt="image"
                className="object-cover block object-center h-full width-full"
                width={290}
                height={70}
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
              <p className="text-md">{product.description.slice(0, 20)}...</p>
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
