import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "@firebase/firestore";
import BuyForm from "../../../components/BuyForm";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Head from "next/head";

// export async function getServerSideProps({ params, res }) {
//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=300, stale-while-revalidate=59"
//   );
//   //get events
//   const eventsCollectionRef = collection(db, `past-events`);
//   const listEvents = await getDocs(eventsCollectionRef);
//   const events = listEvents.docs.map((event) => ({
//     ...event.data(),
//     id: event.id,
//   }));
//   const eventsJSON = JSON.parse(JSON.stringify(events));

//   return {
//     props: {
//       events: eventsJSON,
//     },
//   };
// }

const EventPast = () => {
  const router = useRouter();
  const eventId = router.query.id;
  const eventType = router.pathname.slice(8, router.pathname.length - 5);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventsCollectionRef = collection(db, `past-events`);
      const listEvents = await getDocs(eventsCollectionRef);
      const eventsList = listEvents.docs.map((event) => ({
        ...event.data(),
        id: event.id,
      }));
      setEvents(eventsList);
    };

    getEvents();
  }, []);

  return (
    <div className="eventPage">
      {events.map((ev, i) => {
        if (ev.path === eventId)
          return (
            <div>
              <Head>
                <title>{ev.location}</title>
              </Head>
              <div key={ev.path} className="event-main">
                <h1 className="categoryTitle categoryTitle-nomargin">
                  {ev.location}
                </h1>
                <h1 className="categoryTitle-sub">{ev.city}</h1>
                <div className="event-flex">
                  <img
                    src={
                      "https://drive.google.com/uc?export=view&id=" + ev.poster
                    }
                    className="event-poster event-left"
                    alt={ev.artist}
                  />
                  <div className="event-right">
                    <div className="event-right-text">
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">ARTIST - </span>{" "}
                        {ev.artist} {ev.featartist}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">LOCATION - </span>{" "}
                        {ev.location} {ev.city}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">DATE - </span> {ev.date}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">OPEN GATES - </span>{" "}
                        {ev.time}
                      </h3>
                      <h3 className="event-title event-title-gold-small">
                        <span className="event-title">DESCRIPTION - </span>{" "}
                        {ev.desc}
                      </h3>
                    </div>
                  </div>
                </div>
                <h1 className="categoryTitle-sub categoryTitle-sub-white">
                  PHOTO GALLERY
                </h1>
                <div className="slider-container">
                  <Splide
                    options={{
                      perPage: 3,
                      pagination: false,
                      hasTrack: false,
                      type: "loop",
                      drag: "free",
                      gap: "5rem",
                      autoHeight: true,
                      autoWidth: true,
                    }}
                    className="slider"
                  >
                    {ev.photos.map((photo, i) => {
                      return (
                        <SplideSlide key={i} className="slider-slide">
                          <img
                            src={
                              "https://drive.google.com/uc?export=view&id=" +
                              photo
                            }
                            className="slider-photo"
                            alt="event photo"
                          />
                        </SplideSlide>
                      );
                    })}
                  </Splide>
                </div>
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default EventPast;
