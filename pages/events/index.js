import PastEvents from "../../components/PastEvents";
import UpcomingEvents from "../../components/UpcomingEvents";

export default function Events() {
  return (
    <div>
      <div className='upcomingEvents'>
        <UpcomingEvents />
      </div>
      <div className='pastEvents'>
        <PastEvents />
      </div>
    </div>
  );
}
