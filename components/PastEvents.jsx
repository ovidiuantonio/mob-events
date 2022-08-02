import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";

function PastEvents() {
  const [past, setPast] = useState([]);
  const pastCollectionRef = collection(db, "past-events");

  useEffect(() => {
    const getPast = async () => {
      const events = await getDocs(pastCollectionRef);
      setPast(
        events.docs.map((pastevent) => ({
          ...pastevent.data(),
          id: pastevent.id,
        }))
      );
    };

    getPast();
  }, []);

  return (
    <div>
      <h1 className='categoryTitle categoryTitle-black'>Past Events</h1>
      <div className='events events-past'>
        {past.slice(0, 3).map((ev) => {
          return (
            <div className='event-holder' key={ev.id}>
              <div className='event-content'>
                <h3 className='event-title event-title-gold'>
                  {ev.location}{" "}
                  <span className='event-title event-title-black'>
                    - {ev.date}, {ev.time}
                  </span>{" "}
                </h3>
                <h3 className='event-title event-title-gold'>
                  {ev.artist} {ev.featartist}
                </h3>
                <a
                  className='event-seemore event-seemore-black'
                  href={"/events/past-events/" + ev.path}
                >
                  see more...
                </a>
              </div>
              <div className='event-star'>
                <IoStarSharp className='event-star' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PastEvents;
