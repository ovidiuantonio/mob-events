import PastEvents from "../../components/PastEvents";
import UpcomingEvents from "../../components/UpcomingEvents";
import Head from "next/head";

export default function Events() {
  return (
    <div>
      <Head>
        <title>Events</title>
      </Head>
      <div className="upcomingEvents">
        <UpcomingEvents home={false} />
      </div>
      <div className="pastEvents">
        <PastEvents home={false} />
      </div>
    </div>
  );
}
