import EventBanner from '../components/EventBanner';
import EventDetails from '../components/EventDetails';

const EventInfo = ({ event }) => {
    return (
      <div className="project_event">
        <EventBanner logo={event.logo} awards={[event.awards, event.certificate]} />
        <EventDetails name={event.name} location={event.location} date={event.date} duration={event.duration} />
      </div>
    );
  }
  
  export default EventInfo;
  