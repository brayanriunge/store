import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

type AddProp = {
  children: React.ReactNode;
};

type cartItem = {
  id: string;
  quantity: number;
};
type CartContextType = {
  cartItem: cartItem[];
};
//creating context
const CartContext = createContext({});

export default function CartProvider({ children }: AddProp) {
  const [selectedProduct, setSelectedProduct] = useLocalStorageState<
    cartItem[]
  >("cart", { defaultValue: [] });
  return;
  <CartContext.Provider value={{ selectedProduct, setSelectedProduct }}>
    {children}
  </CartContext.Provider>;
}
