import { useCart } from "@/context/CartContext";
import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import { useEffect, useState } from "react";

type cartItemProp = {
  id: string;
  quantity: string;
};

export default function cartItem({ id, quantity }: cartItemProp) {
  const { addToCart, removeFromCart, decreaseCartItem } = useCart();
  const [item, setItem] = useState<ProductsData | null>(null);
  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const productItem = res.json();
    setItem(await productItem);
  };
  useEffect(() => {
    fetchProduct();
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
