import { useCart } from "@/context/CartContext";

type cartItemProp = {
  id: string;
  quantity: string;
};
export default function cartItem({ id, quantity }: cartItemProp) {
  const { addToCart, removeFromCart } = useCart();
  return <div></div>;
}
