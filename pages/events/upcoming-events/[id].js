import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, doc, setDoc } from "@firebase/firestore";
import BuyForm from "../../../components/BuyForm";
import { openSidebar } from "../../../liveTickets";
import Head from "next/head";

export async function getServerSideProps({ params, res }) {
  res.setHeader("Cache-Control", `s-maxage=300, stale-while-revalidate`);
  //get events
  const eventsCollectionRef = collection(db, `upcoming-events`);
  const listEvents = await getDocs(eventsCollectionRef);
  const events = listEvents.docs.map((event) => ({
    ...event.data(),
    id: event.id,
  }));
  const eventsJSON = JSON.parse(JSON.stringify(events));

  const tablesCollectionRef = collection(db, `tables-${params.id}`);
  const list = await getDocs(tablesCollectionRef);
  const tables = list.docs.map((event) => ({
    ...event.data(),
    id: event.id,
  }));
  const tablesJSON = JSON.parse(JSON.stringify(tables)).length;

  return {
    props: {
      events: eventsJSON,
      tables: tablesJSON,
    },
  };
}

const EventUpcoming = ({ events, tables }) => {
  const router = useRouter();
  const eventId = router.query.id;
  const eventType = router.pathname.slice(8, router.pathname.length - 5);

  useEffect(() => {
    function includeJs(jsFilePath) {
      var js = document.createElement("script");

      js.type = "text/javascript";
      js.src = jsFilePath;

      document.body.appendChild(js);
    }

    function includeCss(jsFilePath) {
      var js = document.createElement("link");

      js.rel = "stylesheet";
      js.href = jsFilePath;

      document.body.appendChild(js);
    }

    if (typeof jQuery == "undefined")
      includeJs("https://www.livetickets.ro/assets/embed/jquery.min.js");
    includeCss("https://www.livetickets.ro/assets/embed/embed.css");
    if (
      window.location.host.indexOf("admin.livetickets.ro") < 0 &&
      window.location.host.indexOf("home.flowconcept.io") < 0
    )
      includeCss(
        "https://www.livetickets.ro/assets/embed/font-awesome/css/font-awesome.min.css"
      );
  }, []);

  return (
    <div className="eventPage">
      {events?.map((ev, i) => {
        if (ev.path === eventId) {
          let location = ev.location,
            city = ev.city,
            poster = ev.poster,
            artist = ev.artist,
            featartist = ev.featartist,
            date = ev.date,
            time = ev.time,
            desc = ev.desc;
          let name = ev.location,
            price = ev.tableprice,
            description = ev.desc,
            path = ev.path;
          let buyComp;
          let buy = () => {
            if (eventType === "upcoming-events")
              buyComp = (
                <BuyForm
                  name={name}
                  price={price}
                  description={description}
                  path={path}
                  index={i}
                  spots={ev.spots}
                  tables={tables}
                  eventId={eventId}
                />
              );
            else buyComp = <></>;
          };
          buy();

          return (
            <div>
              <Head>
                <title>{ev.location}</title>
              </Head>
              <div key={ev.path} className="event-main">
                <h1 className="categoryTitle categoryTitle-nomargin">
                  {location}
                </h1>
                <h1 className="categoryTitle-sub">{city}</h1>
                <div className="event-flex">
                  <img
                    src={"https://drive.google.com/uc?export=view&id=" + poster}
                    className="event-poster event-left"
                    alt={artist}
                  />
                  <div className="event-right">
                    <div className="event-right-text">
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">ARTIST - </span> {artist}{" "}
                        {featartist}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">LOCATION - </span>{" "}
                        {location} {city}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">DATE - </span> {date}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">OPEN GATES - </span>{" "}
                        {time}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">DESCRIPTION - </span>{" "}
                        {desc}
                      </h3>
                    </div>

                    <div className="event-right-button">
                      <a
                        className="button"
                        onClick={() => {
                          openSidebar(
                            `${ev.livetickets}`,
                            "https://www.livetickets.ro"
                          );
                        }}
                      >
                        Buy Ticket
                      </a>
                    </div>
                  </div>
                </div>

                {/* <h1 className="categoryTitle">Book your table</h1>
                {buyComp} */}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default EventUpcoming;
