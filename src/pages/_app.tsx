import { useEffect } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import theme from "@/configs/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const cache = createCache({
  key: "css",
  prepend: true,
});

function App({ Component, pageProps, ...rest }: AppProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  
  useEffect(() => {
    let userRole = localStorage.getItem("role");

    if (router.pathname.includes("/teacher") && userRole !== "teacher") {
      router.push(`/${userRole}/my-lessons`)
    }
    
    if (router.pathname.includes("/student") && userRole !== "student") {
      router.push(`/${userRole}/my-lessons`)
    }

  }, [router])

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Layout t={t}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
