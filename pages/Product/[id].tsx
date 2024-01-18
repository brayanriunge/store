import Layout from "@/components/Layout";
import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function productSpecific() {
  const [items, setItems] = useState<ProductsData | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/client/${id}`
          );
          console.log("Response", response);
          const res = await response.json();
          console.log("Response", res);
          setItems(res);
        } catch (error) {
          console.log("error fetching item", error);
        }
      };
      fetchProduct();
    }
  }, [id]);
  console.log(items);

  return (
    <section className="p-5 pt-28">
      <>
        <div className="md:flex items-center justify-between width-full flex-row gap-4">
          <div className="w-full flex items-center p-10 ">
            <Image
              src={items?.imgUrl as string}
              height={200}
              width={240}
              alt="image"
              className="h-50 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
            />
          </div>
          <div className="flex flex-col mx-auto p-10 w-full lg:w-1/2 lg:py-6 lg:pl-10 ">
            <h1 className="text-3xl text-bold text-blue-400 ">
              Name: <span className="font-bold text-black"> {items?.name}</span>
            </h1>

            <p className="justify-content text-3xl">{items?.description}</p>
            <p className="text-bold">Brand:{items?.brand}</p>
            <p className="text-blue-400">Price:{items?.price}</p>
            <p className="text-blue-400">Quantity: {items?.quantity}</p>
          </div>
        </div>
      </>
    </section>
  );
}
