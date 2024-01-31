import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function productSpecific() {
  const [items, setItems] = useState<ProductsData | null>(null);
  const { getItemQuantity, addToCart } = useCart();
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

  const quantity = getItemQuantity(items?.id as string);

  return (
    <section className="p-5 pt-28">
      <>
        <div className="md:flex items-center justify-between flex-row gap-4">
          <Image
            src={items?.imgUrl as string}
            height={100}
            width={140}
            alt="image"
            className="  rounded-md object-cover object-center  w-1/2"
          />

          <div className="flex flex-col  w-full lg:w-1/2 lg:py-6 lg:pl-10 ">
            <h1 className="text-2xl text-bold text-blue-700 m-2 ">
              Name: <span className="font-bold text-black"> {items?.name}</span>
            </h1>

            <p className="justify-content text-2xl text-blue-700 m-2">
              Description:{" "}
              <span className="font-bold text-black">
                {" "}
                {items?.description}
              </span>
            </p>
            <p className=" text-blue-700 text-bold text-2xl m-2">
              Brand:{" "}
              <span className="font-bold text-black"> {items?.brand}</span>{" "}
            </p>
            <p className="text-blue-700 text-2xl m-2">
              Price:{" "}
              <span className="text-2xl font-bold text-black">
                {" "}
                {items?.price}
              </span>
            </p>
            <p className=" m-2 text-2xl text-blue-700">
              Quantity:{" "}
              <span className=" text-black text-2xl font-bold">
                {" "}
                {items?.quantity}
              </span>
            </p>
            {quantity !== undefined && quantity > 0 ? (
              <button className="p-4 m-4 rounded-md bg-orange-500 hover:bg-yellow-700 ">
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(items?.id as string)}
                className="rounded-md focus:ring-4 focus:ring-purple-300"
              >
                <FaShoppingCart />
                Add to cart
              </button>
            )}
          </div>
        </div>
      </>
    </section>
  );
}
