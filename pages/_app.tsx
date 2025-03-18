import Layout from "@/components/Layout";
import EditModal from "@/components/modals/EditModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <RegisterModal />
        <LoginModal />
        <EditModal/>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </SessionProvider>
  );
}
