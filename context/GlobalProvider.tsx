'use client';

//import { verifySession } from '@/lib/auth';
//import async function from '@/lib/actions';
import { createContext, useContext, useEffect, useMemo } from 'react';
import useLocalStorageState from '@/hooks/useLocalStorageState';
import type { Cart, Product } from '@/types/general';

const GlobalContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
  cart: {
    lines: [
      {
        product: {} as Product,
        quantity: 0,
      },
    ],
    totalAmount: 0,
    totalItems: 0,
  } as Cart,
  addCartProduct: (product: Product) => {},
  updateCartProduct: (product: Product, updateType: 'plus' | 'minus' | 'set', newQuantity?: number) => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    'isDarkMode',
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;
    if (isDarkMode) {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((isDark) => !isDark);
  };

  const [cart, setCart] = useLocalStorageState<Cart>('cart', {
    lines: [],
    totalAmount: 0,
    totalItems: 0,
  });

  const addCartProduct = (product: Product) => {
    setCart((prevState) => {
      const index = prevState.lines.findIndex((line) => line.product.id === product.id);
      if (index === -1) {
        return {
          lines: [...prevState.lines, { product, quantity: 1 }],
          totalAmount: prevState.totalAmount + product.price.discountPrice,
          totalItems: prevState.totalItems + 1,
        };
      }

      const newCart = [...prevState.lines];
      newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };

      return {
        lines: newCart,
        totalAmount: prevState.totalAmount + product.price.discountPrice,
        totalItems: prevState.totalItems + 1,
      };
    });
  };

  const updateCartProduct = (product: Product, updateType: 'plus' | 'minus' | 'set', newQuantity = 0) => {
    setCart((prevState) => {
      const index = prevState.lines.findIndex((line) => line.product.id === product.id);
      if (index === -1) return prevState;

      const newCart = [...prevState.lines];
      const line = newCart[index];
      let totalAmount = prevState.totalAmount;
      let totalItems = prevState.totalItems;

      if (updateType === 'plus') {
        newCart[index] = { ...line, quantity: line.quantity + 1 };
        totalAmount += product.price.discountPrice;
        totalItems += 1;
      } else if (updateType === 'minus') {
        newCart[index] = { ...line, quantity: line.quantity - 1 };
        totalAmount -= product.price.discountPrice;
        totalItems -= 1;
        if (newCart[index].quantity === 0) newCart.splice(index, 1);
      } else if (updateType === 'set') {
        newCart[index] = { ...line, quantity: newQuantity };
        totalAmount += (newQuantity - line.quantity) * product.price.discountPrice;
        totalItems += newQuantity - line.quantity;
        if (newCart[index].quantity === 0) newCart.splice(index, 1);
      }

      return { lines: newCart, totalAmount, totalItems };
    });
  };

  //const { data: session } = useSession();
  //useSWR

  const contextValue = useMemo(
    () => ({ isDarkMode, toggleDarkMode, cart, addCartProduct, updateCartProduct }),
    [isDarkMode, toggleDarkMode, cart, addCartProduct, updateCartProduct],
  );

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

// Create a custom hook to access context
const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error('useGlobalContext was used outside of <GlobalProvider />');
  return context;
};

export { GlobalProvider, useGlobalContext };
