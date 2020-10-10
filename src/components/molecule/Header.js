import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Camera from "@material-ui/icons/Camera";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display:"flex",
    flexDirection:"row",
    justifyItems:"center",
    alignItems:"center"
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
        <Camera style={{marginRight:10}}/>  Full Pager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
