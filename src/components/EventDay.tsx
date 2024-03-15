import { Box } from '@mui/material';
import { sliceString } from '../helper';
import { IEventResponse } from '../types';

export default function EventDay({
  todaysEvents,
}: {
  todaysEvents: IEventResponse[];
}) {
  return (
    <>
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
    </>
  );
}
