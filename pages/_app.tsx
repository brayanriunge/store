import Layout from "@/components/Layout";
import CartProvider from "@/context/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Layout>
  );
}
