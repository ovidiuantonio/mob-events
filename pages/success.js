import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { useEffect } from "react";

function Success() {
  const query = useRouter().query;
  const session_id = query.session_id;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const swr = useSWR(`/api/webhook?session_id=${session_id}`, fetcher);

  console.log(swr);

  return (
    <div className="sponsorships">
      <h1 className="categoryTitle">Payment Success</h1>
    </div>
  );
}

export default Success;
