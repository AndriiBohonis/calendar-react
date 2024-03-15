import { Box } from '@mui/material';
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export default function WeekDays() {
  return (
    <>
      {WEEKDAYS.map(day => (
        <Box key={day} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {day}
        </Box>
      ))}
    </>
  );
}
