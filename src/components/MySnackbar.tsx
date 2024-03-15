import { Snackbar } from '@mui/material';

interface IMySnackbar {
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  message: string;
}
export default function MySnackbar({
  openAlert,
  setOpenAlert,
  message,
}: IMySnackbar) {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Snackbar
      autoHideDuration={3000}
      open={openAlert}
      onClose={handleClose}
      message={message}
    />
  );
}
