import { useRouter } from "next/router"
import useSWR from "swr";
import { useEffect } from "react";

function Success() {
  const {
    query: {session_id},
  } = useRouter();

  const {data, error} = useSWR(
    () => `/api/create-stripe-session/${session_id}`,
  );

  return (
    <div>
        <h1 className='categoryTitle'>Payment Success</h1>
    </div>
  )
}

export default Success