import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";
import Buy from "../components/Buy";
import CtaUpcoming from "../components/CtaUpcoming";
import CtaPast from "../components/CtaPast";
import { useRouter } from "next/router";

export default function Home({ upcoming, past }) {
  const router = useRouter();
  const { status } = router.query;

  return (
    <div>
      <div className="upcomingEvents">
        <UpcomingEvents home={true} />
        <CtaUpcoming />
      </div>
      <div className="pastEvents">
        <PastEvents home={true} />
        <CtaPast />
      </div>

      <Buy />
    </div>
  );
}
