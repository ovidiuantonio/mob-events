import UpcomingEvents from "../../../components/UpcomingEvents";
import Head from "next/head";

function Upcomingevents() {
  return (
    <div className="upcomingEvents">
      <Head>
        <title>Upcoming Events</title>
      </Head>
      <UpcomingEvents home={false} />
    </div>
  );
}

export default Upcomingevents;
