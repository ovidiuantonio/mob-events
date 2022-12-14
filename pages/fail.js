import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

function Fail() {
  const query = useRouter().query;
  const session_id = query.session_id;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    session_id ? `/api/checkout/${session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  return (
    <div className="sponsorships">
      <Head>
        <title>Fail</title>
      </Head>
      <h1 className="categoryTitle">Payment Failed</h1>
    </div>
  );
}

export default Fail;
