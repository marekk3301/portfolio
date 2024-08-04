import EventBanner from '../components/EventBanner';
// import EventDetails from './components/EventDetails';

const EventInfo = ({ event }) => {
    return (
      <div className="event">
        <EventBanner logo={event.logo} duration={event.duration} />
        {/* <EventDetails name={event.name} place={event.location} date={event.date} /> */}
      </div>
    );
  }
  
  export default EventInfo;
  