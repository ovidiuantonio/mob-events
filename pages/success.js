import { useRouter } from "next/router";
import useSWR from "swr";
import Confetti from "react-confetti";
import Head from "next/head";

function Success() {
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
        <title>Success</title>
      </Head>
      <h1 className="categoryTitle">Payment Succeeded</h1>
      <Confetti
        width={3000}
        height={1000}
        recycle={false}
        numberOfPieces={1000}
        initialVelocityY={5}
      />
    </div>
  );
}

export default Success;
