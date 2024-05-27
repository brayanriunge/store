import { useCart } from "@/context/CartContext";
import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

export type cartItemProp = {
  id: string;
  quantity: number;
};

export default function CartItem({ id, quantity }: cartItemProp) {
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
    <section>
      {item && (
        <section className="  flex flex-row-5 items-center justify-between mt-24">
          <div className="mx-auto p-5 w-5/6 flex flex-row-5 items-center justify-between gap-5 mt-6 shadow-xl bg-white rounded-lg">
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
            <div className="flex">
              <h1 className="text-md px-4">
                Price: <span> {item.price * quantity}</span>
              </h1>
            </div>
            <div className="text-md">
              <button
                onClick={() => removeFromCart(id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
