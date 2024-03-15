import EventCalendar from './components/EventCalendar';

import { useEventStore } from './stor/eventStore';
import { useEffect } from 'react';
import { useSUserStore } from './stor/userStote';
import Header from './components/Header';

const App = () => {
  const { events, getEvents } = useEventStore();
  const { user } = useSUserStore();

  useEffect(() => {
    getEvents();
  }, [user]);

  return (
    <>
      <Header />
      {events && <EventCalendar events={events} />}
    </>
  );
};
export default App;
