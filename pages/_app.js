import "../styles/index.scss";
import "../styles/components.scss";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
