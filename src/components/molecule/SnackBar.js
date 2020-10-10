import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} style={{ minWidth: 300, width: '100%' }} />;
}

const SnackBar = (props) => {
  const { open,message,variant } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.onClose();
  };

  return (
    <Snackbar autoHideDuration={5000} style={{ zIndex: 3010 }} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} onClose={handleClose}>
      <Alert onClose={handleClose} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
};


SnackBar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  variant: PropTypes.string
};

SnackBar.defaultProps = {
    open: false,
    message: '',
    variant: 'success'
};

export default (SnackBar);
