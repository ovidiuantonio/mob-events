import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { useEffect } from "react";

function Success() {
  const query = useRouter().query;
  const session_id = query.session_id;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    session_id ? `/api/checkout/${session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  console.log(JSON.stringify(data, null, 2));

  return (
    <div className="sponsorships">
      <h1 className="categoryTitle">Payment Success</h1>
      <p>{data ? JSON.stringify(data, null, 2) : "Loading"}</p>
    </div>
  );
}

export default Success;
