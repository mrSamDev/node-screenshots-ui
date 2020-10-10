import React from "react";
import Container from "../atoms/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Camera from "@material-ui/icons/Camera";
import EmptyState from "../molecule/EmptyState";
import actions from "../../utils/getScreenShot";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "url", label: "URL", minWidth: 100 },
  {
    id: "dimensions",
    label: "Dimensions",
    minWidth: 100,
    align: "left",
  },
  {
    id: "format",
    label: "Format",
    minWidth: 100,
    align: "left",
  },
];

const trimText = (string) => {
  const length = 50;
  if (string.length > length) return string.substring(0, length - 3) + "...";
  return string;
};

const History = ({ history = [] }) => {
  const [loading, setLoading] = React.useState(null);
  const classes = useStyles();

  const reDownLoad = async (options) => {
    setLoading(options.url);
    await actions.getScreenShot(options);
    setLoading(null);
  };

  return (
    <Container>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader={Boolean(history && history.length)} aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell key={"download"} align={"right"} style={{ width: 20 }}></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {history && history.length ? (
                history.map((row) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        const isObject = typeof value === "object";

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {isObject ? (
                              Object.keys(value).map((key) => <Typography variant="body1">{`${key}: ${value[key]}`}</Typography>)
                            ) : (
                              <React.Fragment>
                                <Tooltip placement="bottom-start" title={value}>
                                <Typography variant="body1">{trimText(value)}</Typography>
                                </Tooltip>
                              </React.Fragment>
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell key={"download-cell"} align={"right"} style={{ width: 20 }}>
                      <Tooltip placement="bottom" title={"Capture"}>
                        <IconButton disabled={loading} onClick={() => reDownLoad(row)}>
                          {row.loading || loading === row.url ? <CircularProgress size={15} /> : <Camera />}
                        </IconButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <TableCell colSpan={12} key={"empty"}>
                  <EmptyState disablePaper />
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default History;
