import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Login from './form/Login';
import RegisterForm from './form/RegisterForm';

import { getToken } from '../api';
import { useSUserStore } from '../stor/userStote';
import MySnackbar from './MySnackbar';

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { loginUser, registerUser, getUser, logoutUser, user, isUser, error } =
    useSUserStore();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getToken(token);
      getUser();
    }
    if (error) {
      setOpenAlert(true);
    }
  }, [error]);
  return (
    <>
      <Box
        sx={{
          height: '90px',
          width: '100vw',
          background: 'black',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {user && (
          <>
            <Typography sx={{ color: 'white', px: 5 }} variant='h6'>
              Welcome {user?.name}
            </Typography>
            <Button sx={{ px: 5 }} onClick={() => logoutUser()}>
              logout
            </Button>
          </>
        )}
        {!user && (
          <ButtonGroup sx={{ px: 6, py: 2 }}>
            <Button onClick={() => setOpenRegister(true)}>register</Button>
            <Button onClick={() => setOpenLogin(true)}>login</Button>
          </ButtonGroup>
        )}
      </Box>
      <Login
        isUser={isUser}
        loginUser={loginUser}
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
      />
      <RegisterForm
        isUser={isUser}
        registerUser={registerUser}
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
      />
      <MySnackbar
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={error?.message || ''}
      />
    </>
  );
}
