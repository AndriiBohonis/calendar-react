import { Box, Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEventStore } from '../../stor/eventStore';

export default function TextInput({ dayDate }: { dayDate: string }) {
  const [text, setText] = useState('');
  const [inputError, setInputError] = useState('');

  const { createEvent } = useEventStore();

  const submit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (text) {
      createEvent({
        description: text,
        event_date: dayDate,
      });
      setInputError('');

      setText('');
    } else {
      setInputError('field cannot be empty');
    }
  };
  return (
    <form onSubmit={submit}>
      <Stack direction='row'>
        <TextField
          autoFocus
          autoComplete='off'
          fullWidth
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder='new todo...'
          error={!!inputError}
          helperText={inputError}
        />
        <Box>
          <Button
            sx={{ width: '150px', minHeight: '48px', p: '16px', ml: 1 }}
            variant='contained'
            type='submit'>
            Add
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
