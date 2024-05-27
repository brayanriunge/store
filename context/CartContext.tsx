import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorageState from "use-local-storage-state";

type AddProp = {
  children: ReactNode;
};

type CartItem = {
  id: string;
  quantity: number;
};
type CartContextType = {
  cartItem: CartItem[];
  cartQuantity: number;
  addToCart: (id: string) => void;
  getItemQuantity: (id: string) => void;
  addCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  decreaseCartItem: (id: string) => void;
};
//creating context
const CartContext = createContext({} as CartContextType);

//custom hook to access CartContext
export function useCart() {
  const context = useContext(CartContext);
  console.log("context for cart:", context);
  return context;
}

export default function CartProvider({ children }: AddProp) {
  const [cartItem, setCartItem] = useLocalStorageState<CartItem[]>("cart", {
    defaultValue: [],
  });
  console.log("CartProvider - cartItems:", cartItem);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  // Effect to recalculate cart quantity when cart items change
  useEffect(() => {
    setCartQuantity(cartItem.reduce((total, item) => total + item.quantity, 0));
  }, [cartItem]);

  console.log("CartProvider - cartQuantity:", cartQuantity);

  //function to add items to a cart and also its quantity
  function addToCart(id: string) {
    setCartItem((defaultValue) => {
      if (defaultValue.find((item) => item.id === id) == null) {
        return [...defaultValue, { id, quantity: 1 }];
      } else {
        //if the item is already chosen add the add the quantity by one
        return defaultValue.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Function to get the quantity of a specific item in the cart
  function getItemQuantity(id: string) {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }

  // Function to increase the quantity of a specific item in the cart, with a limit of 10
  function addCartQuantity(id: string) {
    setCartItem((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity <= 10 ? newQuantity : item.quantity,
          };
        } else {
          return item;
        }
      });
    });
  }

  //function to decrease cart quantity
  function decreaseCartItem(id: string) {
    setCartItem((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          return {
            ...item,
            quantity: newQuantity >= 1 ? newQuantity : item.quantity,
          };
        } else {
          return item;
        }
      });
    });
  }

  //function to remove an item from cart
  function removeFromCart(id: string) {
    setCartItem((currentItems) => {
      //filter out the item with specified Id
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItem,
        cartQuantity,
        addToCart,
        getItemQuantity,
        addCartQuantity,
        removeFromCart,
        decreaseCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
