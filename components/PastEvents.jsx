import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";

function PastEvents({ home }) {
  const [limit, setLimit] = useState(99999);
  const [past, setPast] = useState([]);



  useEffect(() => {
    const getPast = async () => {
      const pasteventsCollectionRef = collection(db, `past-events`);
      const pastlistEvents = await getDocs(pasteventsCollectionRef);
      const pastevents = pastlistEvents.docs.map((event) => ({
        ...event.data(),
        id: event.id,
      }));
      setPast(JSON.parse(JSON.stringify(pastevents)));
    }

    getPast()

    if (home) {
      setLimit(3);
    }

  }, [])


  return (
    <div>
      <h1 className="categoryTitle categoryTitle-black">Past Events</h1>
      <div className="events events-past">
        {past.slice(0, limit).map((ev) => {
          return (
            <div className="event-holder" key={ev.id}>
              <div className="event-content">
                <h3 className="event-title event-title-gold">
                  {ev.location}{" "}
                  <span className="event-title event-title-black">
                    - {ev.date}, {ev.time}
                  </span>{" "}
                </h3>
                <h3 className="event-title event-title-gold">
                  {ev.artist} {ev.featartist}
                </h3>
                <a
                  className="event-seemore event-seemore-black"
                  href={"/events/past-events/" + ev.path}
                >
                  see more...
                </a>
              </div>
              <div className="event-star">
                <IoStarSharp className="event-star" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PastEvents;
