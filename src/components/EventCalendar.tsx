import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import { useMemo, useState } from 'react';
import CalendarDialog from './Dialog';

import { IEventResponse } from '../types';
import { useSUserStore } from '../stor/userStote';
import MySnackbar from './MySnackbar';

import WeekDays from './WeekDays';
import { DayInMonth } from './DayInMonth';

interface EventCalendarProps {
  events: IEventResponse[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [dayDate, setDayDate] = useState('');

  const { user } = useSUserStore();

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDay = getDay(firstDayOfMonth);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: IEventResponse[] }, event) => {
      const dateKey = event.event_date;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const handelDayClick = (event_date: string) => {
    if (!user) {
      setOpenAlert(true);
    } else {
      setDayDate(event_date);

      setOpen(true);
    }
  };
  return (
    <>
      <Box sx={{ width: '90vw', height: '85vh', m: '20px auto' }}>
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'row'}
          sx={{ marginBottom: '16px' }}>
          <div>
            <IconButton onClick={handlePrevMonth}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Typography sx={{ width: '400px', textAlign: 'center' }} variant='h4'>
            {format(currentDate, 'MMMM yyyy')}
          </Typography>
          <div>
            <IconButton onClick={handleNextMonth}>
              <ChevronRight />
            </IconButton>
          </div>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
          }}>
          <WeekDays />

          <DayInMonth
            startingDay={startingDay}
            daysInMonth={daysInMonth}
            handelDayClick={handelDayClick}
            eventsByDate={eventsByDate}
          />
        </Box>
      </Box>
      <CalendarDialog open={open} setOpen={setOpen} dayDate={dayDate} />
      <MySnackbar
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={'Only authorized users can make notes'}
      />
    </>
  );
};

export default EventCalendar;
