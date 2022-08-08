import "../styles/index.scss";
import "../styles/components.scss";
import "../styles/nprogress.css";
import Layout from "../components/Layout";
import Router from "next/router";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
