import {
  Checkbox,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { IEventResponse } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

interface IEventItem extends IEventResponse {
  handlerUpdate: (id: number, done: boolean) => void;
  handlerRemove: (id: number) => void;
}
export const EventItem = ({
  done,
  id,
  description,
  handlerUpdate,
  handlerRemove,
}: IEventItem) => {
  const [checked, setChecked] = useState(!!done);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <ListItem>
      <Paper sx={{ width: '100%', px: { xs: '8px', lg: '16px' } }}>
        <Stack
          sx={{ minHeight: '70px' }}
          spacing={4}
          direction='row'
          alignItems={'center'}>
          <Tooltip
            onClick={() => handlerUpdate(id, done)}
            title={'Done'}
            placement='top'>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              color='success'
            />
          </Tooltip>
          <Typography
            sx={{
              flexGrow: 1,
            }}
            component={'p'}>
            {description}
          </Typography>
          <Tooltip placement='top' title='Delete'>
            <IconButton onClick={() => handlerRemove(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>
    </ListItem>
  );
};
