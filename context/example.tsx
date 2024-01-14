import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
  } from "react";
  import useLocalStorage from "../hooks/useLocalStorage";
  
  // Define the types for the CartProvider component
  type CartProviderProps = {
    children: ReactNode;
  };
  
  type CartItem = {
    id: string;
    quantity: number;
  };
  
  type CartContextTypes = {
    addToCart: (id: string) => void;
    getItemQuantity: (id: string) => number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    cartQuantity: number;
    cartItems: CartItem[];
  };
  
  // Create a context for the cart functionality
  const CartContext = createContext({} as CartContextTypes);
  
  // Custom hook to access the cart context
  export function useCart() {
    return useContext(CartContext);
  }
  
  // CartProvider component that manages the cart state and provides it to its children
  export function CartProvider({ children }: CartProviderProps) {
    // Retrieve cart items from local storage, with a default value of an empty array
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
    // State to keep track of the total quantity of items in the cart
    const [cartQuantity, setCartQuantity] = useState<number>(0);
  
    // Effect to recalculate cart quantity when cart items change
    useEffect(() => {
      // Calculate the cartQuantity after the component has mounted on the client side
      setCartQuantity(
        cartItems.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0)
      );
    }, [cartItems]);
  
    // Function to add an item to the cart or increase its quantity
    function addToCart(id: string) {
      setCartItems((currentItems: any) => {
        if (currentItems.find((item) => item.id === id) == null) {
          // If the item is not in the cart, add it with a quantity of 1
          return [...currentItems, { id, quantity: 1 }];
        } else {
          // If the item is already in the cart, increase its quantity by 1
          return currentItems.map((item) => {
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
      return cartItems.find((item) => item.id === id)?.quantity || 0;
    }
  
    // Function to increase the quantity of a specific item in the cart, with a limit of 10
    function increaseCartQuantity(id: string) {
      setCartItems((currentItems) => {
        return currentItems.map((item) => {
          if (item.id === id) {
            // Check to make sure the new quantity does not exceed 10
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
  
    // Function to decrease the quantity of a specific item in the cart, with a limit of 1
    function decreaseCartQuantity(id: string) {
      setCartItems((currentItems) => {
        return currentItems.map((item) => {
          if (item.id === id) {
            // Check to make sure the new quantity does not go below 1
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
  
    // Function to remove an item from the cart
    function removeFromCart(id: string) {
      setCartItems((currentItems) => {
        // Filter out the item with the specified ID
        return currentItems.filter((item) => item.id !== id);
      });
    }
  
    // Provide the cart functionality to its children components
    return (
      <CartContext.Provider
        value={{
          addToCart,
          getItemQuantity,
          increaseCartQuantity,
          decreaseCartQuantity,
          removeFromCart,
          cartItems,
          cartQuantity,
        }}>
        {children}
      </CartContext.Provider>
    );