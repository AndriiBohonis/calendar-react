import { Box } from '@mui/material';
import { format, isToday } from 'date-fns';
import EventDay from './EventDay';
import { IEventResponse } from '../types';

interface IDayInMonth {
  startingDay: number;
  daysInMonth: Date[];
  handelDayClick: (day: string) => void;
  eventsByDate: { [key: string]: IEventResponse[] };
}
export const DayInMonth = ({
  startingDay,
  daysInMonth,
  handelDayClick,
  eventsByDate,
}: IDayInMonth) => {
  return (
    <>
      <EmptyDay startingDay={startingDay} />
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
            <EventDay todaysEvents={todaysEvents} />
          </Box>
        );
      })}
    </>
  );
};

const EmptyDay = ({ startingDay }: { startingDay: number }) => {
  return (
    <>
      {Array.from({ length: startingDay }).map((_, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: '4px',
            padding: '8px',
            textAlign: 'center',
          }}
        />
      ))}
    </>
  );
};
