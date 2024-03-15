import { Box, Button, Dialog, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IUserRegister } from '../../types';

interface IRegisterForm {
  openRegister: boolean;
  isUser: boolean;
  setOpenRegister: (open: boolean) => void;
  registerUser: (user: IUserRegister) => void;
}
export default function RegisterForm({
  openRegister,
  isUser,
  setOpenRegister,
  registerUser,
}: IRegisterForm) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');
  const handleClose = () => {
    setOpenRegister(false);
  };
  const submit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (email && password && name) {
      registerUser({ name, email, password });
    } else {
      setInputError('field cannot be empty');
    }
  };

  useEffect(() => {
    if (isUser) {
      setInputError('');
      setPassword('');
      setEmail('');
      setName('');
      setOpenRegister(false);
    }
  }, [isUser]);
  return (
    <Dialog
      open={openRegister}
      maxWidth={'md'}
      fullWidth={true}
      onClose={handleClose}>
      <form onSubmit={submit}>
        <Stack sx={{ py: 4, px: 4 }} justifyContent={'center'} gap={3}>
          <TextField
            autoFocus
            autoComplete='off'
            label='Name'
            value={name}
            onChange={event => setName(event.target.value)}
            error={!!inputError}
            helperText={inputError}
          />
          <TextField
            autoComplete='off'
            label='Email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            error={!!inputError}
            helperText={inputError}
          />
          <TextField
            autoComplete='off'
            label='Password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            error={!!inputError}
            helperText={inputError}
          />
          <Box>
            <Button
              sx={{ width: '150px', minHeight: '48px', p: '16px' }}
              variant='contained'
              type='submit'>
              Login
            </Button>
          </Box>
        </Stack>
      </form>
    </Dialog>
  );
}
