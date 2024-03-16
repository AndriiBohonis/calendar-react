import EventCalendar from './components/EventCalendar';

import { useEventStore } from './store/eventStore';
import { useEffect, useState } from 'react';
import { useSUserStore } from './store/userStote';
import Header from './components/Header';
import MySnackbar from './components/MySnackbar';

const App = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const { events, getEvents, error } = useEventStore();
  const { user } = useSUserStore();

  useEffect(() => {
    getEvents();
  }, [user]);

  return (
    <>
      <Header />
      {events && <EventCalendar events={events} />}
      <MySnackbar
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={error?.message || ''}
      />
    </>
  );
};
export default App;
