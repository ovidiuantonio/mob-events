import "../styles/index.scss";
import "../styles/components.scss";
import "../styles/nprogress.css";
import Layout from "../components/Layout";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
