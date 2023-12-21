import useLocalStorageState from "use-local-storage-state";

type cartItem = {
  id: string;
  quantity: number;
};
type CartContext = {
  cartItem: cartItem[];
};

export default function CartProvider() {
  const [selectedProduct, setSelectedProduct] = useLocalStorageState<
    cartItem[]
  >("cart", { defaultValue: [] });
  return <div></div>;
}
