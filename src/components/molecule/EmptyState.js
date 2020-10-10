import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import History from "@material-ui/icons/History"

const EmptyState = ({type, disablePaper, disabelMinHeight, }) => (
  <Grid component={disablePaper ? 'div' : Paper} style={{ minHeight: disabelMinHeight ? 20 : 150, padding: 10, textAlign: 'center' }} container direction="column" justify="center" alignItems="center" spaciong={3}>
    <Grid item>
      <Grid style={{ padding: '1rem' }}><History style={{color:"#546e7a",fontSize:60}} /></Grid>
      <Typography variant="h6" color="textSecondary">
      Sorry, there is no history to display
      </Typography>
     
    </Grid>
  </Grid>
);

EmptyState.propTypes = {
  type: PropTypes.string,
  disablePaper: PropTypes.bool,
  disabelMinHeight: PropTypes.bool,
};

export default EmptyState;
