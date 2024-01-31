import { useCart } from "@/context/CartContext";
import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

type cartItemProp = {
  id: string;
  quantity: number;
};

export default function cartItem({ id, quantity }: cartItemProp) {
  const { addToCart, removeFromCart, decreaseCartItem } = useCart();
  const [item, setItem] = useState<ProductsData | null>(null);

  const fetchItem = async () => {
    const productId = await fetch(`http://localhost:3000/api/client/${id}`);
    console.log("Response");
    const res = await productId.json();
    setItem(res);
    console.log(res);
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  return (
    <section className=" m-5 p-5 w-full flex flex-row items-center justify-between gap-5 mt-10">
      {item && (
        <>
          <div className="rounded-md mt-6">
            <Image
              src={item?.imgUrl as string}
              alt={item?.name as string}
              height={60}
              width={60}
            />
          </div>
          <div className="text-bold text-lg ">{item.brand}</div>
          <div className=" inline-flex border-4 border-gray-700 ">
            <button
              className=" px-5 py-2.5 font-medium "
              onClick={() => addToCart(item.id)}
            >
              <HiOutlinePlus />
            </button>
            <div className="px-5 py-2.5 font-medium font-gray-900">
              {quantity}
            </div>

            <button
              className="px-5 py-2.5 font-medium "
              onClick={() => decreaseCartItem(item.id)}
            >
              <HiOutlineMinus />
            </button>
          </div>
          <div className="text-md">
            <button
              onClick={() => removeFromCart(id)}
              className="text-red-300 hover:underline"
            >
              Remove
            </button>
          </div>
        </>
      )}
    </section>
  );
}
