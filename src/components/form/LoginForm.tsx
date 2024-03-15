import { Box, Button, Dialog, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IUserLogin } from '../../types';
interface ILoginForm {
  openLogin: boolean;
  isUser: boolean;
  setOpenLogin: (open: boolean) => void;
  loginUser: (user: IUserLogin) => void;
}
export default function LoginForm({
  openLogin,
  setOpenLogin,
  loginUser,
  isUser,
}: ILoginForm) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');

  const submit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (email && password) {
      setInputError('');
      loginUser({ email, password });
    } else {
      setInputError('field cannot be empty');
    }
  };

  useEffect(() => {
    if (isUser) {
      setPassword('');
      setEmail('');
      setOpenLogin(false);
    }
  }, [isUser]);

  const handleClose = () => {
    setOpenLogin(false);
  };
  return (
    <Dialog
      open={openLogin}
      maxWidth={'md'}
      fullWidth={true}
      onClose={handleClose}>
      <form onSubmit={submit}>
        <Stack sx={{ py: 4, px: 4 }} justifyContent={'center'} gap={3}>
          <TextField
            autoFocus
            autoComplete='off'
            label='Login'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='new todo...'
            error={!!inputError}
            helperText={inputError}
          />
          <TextField
            autoComplete='off'
            label='Password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder='new todo...'
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
