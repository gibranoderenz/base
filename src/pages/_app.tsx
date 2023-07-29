import { AuthContextProvider } from "@/components/contexts";
import { Layout } from "@/components/elements";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Toaster />
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </AuthContextProvider>
  );
}
