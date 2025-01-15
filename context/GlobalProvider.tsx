'use client';

import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorageState from '@/hooks/useLocalStorageState';
import { logout } from '@/lib/auth';
import type { verifySession } from '@/lib/auth/requests';
import type { Cart, Product } from '@/types/general';

type User = Awaited<ReturnType<typeof verifySession>>['user'];

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
  user: null as User,
  isLoading: false,
  clientLogout: async () => {},
});

const GlobalProvider = ({ children, user }: Readonly<{ children: React.ReactNode; user: User }>) => {
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

  const [userState, setUserState] = useState({ user, isLoading: false, error: null as string | null });
  const router = useRouter();

  useEffect(() => {
    setUserState((prevState) => ({ ...prevState, user }));
  }, [user]);

  const clientLogout = useCallback(async () => {
    setUserState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      const res = await logout();
      const err = res && res.message ? res : null;
      if (err) {
        setUserState((prevState) => ({ ...prevState, error: err.message }));
      } else {
        setUserState((prevState) => ({ ...prevState, user: null }));
      }
    } catch (error) {
      if (error instanceof Error) {
        setUserState((prevState) => ({ ...prevState, error: error.message || 'Something went wrong' }));
      }
    } finally {
      setUserState((prevState) => ({ ...prevState, isLoading: false }));
      router.push('/');
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
      cart,
      addCartProduct,
      updateCartProduct,
      user: userState.user,
      isLoading: userState.isLoading,
      clientLogout,
    }),
    [isDarkMode, toggleDarkMode, cart, addCartProduct, updateCartProduct, userState.user, clientLogout],
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
