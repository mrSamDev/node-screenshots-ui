import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const Container = (props) => {
  return (
    <Grid container direction="column" alignContent={"stretch"} style={{ padding: props.disablePadding ? 0 : 8 * 3, maxWidth: props.fluid ? "auto" : 1400, margin: "0px auto", ...props.additionalStyles }}>
      {props.children}
    </Grid>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
