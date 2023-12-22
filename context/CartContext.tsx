import { ReactNode, createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

type AddProp = {
  children: ReactNode;
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
  const [cartItem, setCartItem] = useLocalStorageState<cartItem[]>("cart", {
    defaultValue: [],
  });
  const [quantity, setQuantity] = useState<number>(0);

  //function to add items to a cart and also its quantity
  function addCart(id: string) {
    setCartItem((currentItems) => {
      if (currentItems.find((items) => items.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        //if the item is already choosen add the number o
      }
    });
  }

  return (
    <CartContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </CartContext.Provider>
  );
}
