import { useCart } from "@/context/CartContext";
import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <section className="flex flex-col items-center justify-between gap-2">
      <div>
        <Image
          src={item?.imgUrl as string}
          alt="product"
          height={60}
          width={60}
        />
      </div>
    </section>
  );
}
