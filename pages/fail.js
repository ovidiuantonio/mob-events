import { useRouter } from "next/router"
import useSWR from "swr";
import { useEffect } from "react";

function Fail() {
  const {
    query: {session_id},
  } = useRouter();

  const {data, error} = useSWR(
    () => `/api/create-stripe-session/${session_id}`,
  );

  return (
    <div className="sponsorships">
        <h1 className='categoryTitle'>Payment Fail</h1>
    </div>
  )
}

export default Fail