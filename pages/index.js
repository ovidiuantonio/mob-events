import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";
import Buy from "../components/Buy";
import CtaUpcoming from "../components/CtaUpcoming";
import CtaPast from "../components/CtaPast";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { status } = router.query;

  return (
    <div>
      <div className="upcomingEvents">
        <UpcomingEvents />
        <CtaUpcoming />
      </div>
      <div className="pastEvents">
        <PastEvents />
        <CtaPast />
      </div>

      <Buy />
    
      {status && status === 'success' && (
        <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
          Payment Successful
        </div>
      )}
      {status && status === 'cancel' && (
        <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
          Payment Unsuccessful
        </div>
      )}
    </div>
  );
}
