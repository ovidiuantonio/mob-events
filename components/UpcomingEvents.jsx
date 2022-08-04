import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";

function UpcomingEvents({ home }) {
  const [limit, setLimit] = useState(999999);
  const [upcoming, setUpcoming] = useState([]);


  useEffect(() => {
    const getUpcoming = async () => {
      const upeventsCollectionRef = collection(db, `upcoming-events`);
      const uplistEvents = await getDocs(upeventsCollectionRef);
      const upevents = uplistEvents.docs.map((event) => ({
        ...event.data(),
        id: event.id,
      }));
      setUpcoming(JSON.parse(JSON.stringify(upevents)));
    }
    getUpcoming()

    if (home) {
      setLimit(3);
    }



  }, [])


  return (
    <div>
      <h1 className="categoryTitle">Upcoming Events</h1>
      <div className="events">
        {upcoming.slice(0, limit).map((ev, i) => {
          return (
            <div className="event-holder" key={ev.id}>
              <div className="event-content">
                <h3 className="event-title event-title-gold">
                  {ev.location}{" "}
                  <span className="event-title">
                    - {ev.date}, {ev.time}
                  </span>{" "}
                </h3>
                <h3 className="event-title event-title-gold">
                  {ev.artist} {ev.featartist}
                </h3>
                <a
                  className="event-seemore"
                  href={"/events/upcoming-events/" + ev.path}
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

export default UpcomingEvents;
