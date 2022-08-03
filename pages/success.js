import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Confetti from "react-confetti";

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
      <h1 className="categoryTitle">Payment Success</h1>
      <Confetti
        width={3000}
        height={3000}
        recycle={false}
        numberOfPieces={1000}
        initialVelocityY={5}
      />
    </div>
  );
}

export default Success;
