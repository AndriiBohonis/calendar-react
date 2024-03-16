import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextInput from './form/TextInput';
import { Box, List, Typography } from '@mui/material';
import { EventItem } from './EventItem';
import { IEventResponse } from '../types';
import { useEventStore } from '../store/eventStore';
import { forwardRef, useEffect, useState } from 'react';

export default function CalendarDialog({
  open,
  setOpen,
  dayDate,
}: ICalendarDialog) {
  const [dayEvent, setDayEvent] = useState<IEventResponse[]>([]);
  const { updateEvent, removeEvent, events } = useEventStore();

  useEffect(() => {
    const todaysEvents = events.filter(event => event.event_date === dayDate);
    setDayEvent(todaysEvents);
  }, [dayDate, events]);

  const handlerUpdate = (id: number, done: boolean) => {
    updateEvent({ done: !done, id });
  };

  const handlerRemove = (id: number) => {
    removeEvent(id);
    setDayEvent(dayEvent.filter(item => item.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'md'}
      fullWidth={true}
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'>
      <Box sx={{ display: 'grid', p: 2, minHeight: '200px' }}>
        <Typography sx={{ textAlign: 'center' }} variant='h6'>
          {dayDate}
        </Typography>

        <List sx={{ overflow: 'scroll' }}>
          {dayEvent?.map(event => (
            <EventItem
              handlerUpdate={handlerUpdate}
              handlerRemove={handlerRemove}
              key={event.id}
              {...event}
            />
          ))}
        </List>

        <TextInput dayDate={dayDate} />
      </Box>
    </Dialog>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});
interface ICalendarDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  dayDate: string;
}
