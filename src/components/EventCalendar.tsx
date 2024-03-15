import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import { useMemo, useState } from 'react';
import CalendarDialog from './Dialog';

import { IEventResponse } from '../types';
import { useSUserStore } from '../stor/userStote';
import MySnackbar from './MySnackbar';
import { sliceString } from '../helper';
import WeekDays from './WeekDays';

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

  const startingDayIndex = getDay(firstDayOfMonth);

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

          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <Box
              key={`empty-${index}`}
              sx={{
                borderRadius: '4px',
                padding: '8px',
                textAlign: 'center',
              }}
            />
          ))}
          {daysInMonth.map((day, index) => {
            const event_date = format(day, 'yyyy-MM-dd');
            const todaysEvents = eventsByDate[event_date] || [];
            return (
              <Box
                onClick={() => handelDayClick(event_date)}
                key={index}
                sx={{
                  cursor: 'pointer',
                  height: '100px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '8px',
                  overflow: 'scroll',
                  backgroundColor: isToday(day) ? '#f0f0f0' : 'initial',
                }}>
                {format(day, 'd')}
                {todaysEvents.map(event => (
                  <Box
                    key={event.id}
                    sx={{
                      backgroundColor: event.done ? '#00c853' : '#e4e6dc',
                      color: '#000',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      marginBottom: '4px',
                      maxWidth: '100%',
                    }}>
                    {sliceString(event.description, 20)}
                  </Box>
                ))}
              </Box>
            );
          })}
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
