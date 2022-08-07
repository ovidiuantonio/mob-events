import PastEvents from "../../../components/PastEvents";
import Head from "next/head";

function Pastevents() {
  return (
    <div className="pastEvents">
      <Head>
        <title>Past Events</title>
      </Head>
      <PastEvents home={false} />
    </div>
  );
}

export default Pastevents;
