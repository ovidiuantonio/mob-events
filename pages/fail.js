import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";

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
      <h1 className="categoryTitle">Payment Fail</h1>
      <p>{data ? JSON.stringify(data, null, 2) : "Loading"}</p>
    </div>
  );
}

export default Fail;
