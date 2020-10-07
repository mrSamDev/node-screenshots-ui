import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../molecule/Header";
import { Paper, Grid, TextField, Button, Typography, Divider, FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@material-ui/core";
import Container from "../atoms/Container";
import { Controller, useForm } from "react-hook-form";
import Camera from "@material-ui/icons/Camera";
import History from "./History";
import actions from "../../utils/getScreenShot";
import sessionStorage from "../../utils/sessionsStorage";

const nameGenerator = (url) => {
  return url.replaceAll("/", "").replaceAll(":", "").replaceAll(".", "");
};

const extensionToFormat = {
  jpg: "jpeg",
  png: "png",
};

export default function LandingPage() {
  const [loading, setLoading] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const historyValue = sessionStorage.get("fullPageHistory", true);

    setHistory(historyValue || []);
  }, []);

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      url: "https://reactjs.org/docs/create-a-new-react-app.html",
      dimensions: {
        width: 1366,
        height: 768,
      },
      extension: "jpg",
    },
  });

  const submit = async ({ url, ...rest }) => {
    try {
      setError(false);
      setLoading((prev) => !prev);
      const name = nameGenerator(url);
      let options = { url, ...rest, name, format: extensionToFormat[rest.extension] };
      await actions.getScreenShot(options);
      setLoading((prev) => !prev);
      const historyClone = [...history];
      const index = historyClone.findIndex((i) => i.url === url);
      if (index > -1) historyClone[index] = { ...historyClone[index], ...options };
      else historyClone.unshift(options);
      console.log("historyClone: ", historyClone);
      setHistory(historyClone);
      sessionStorage.set("fullPageHistory", historyClone);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <div style={{ paddingBottom: 40 }}>
        <Container>
          <form onSubmit={handleSubmit(submit)}>
            <Grid className="fullWidth" container direction="row" justify="center" alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={2}>
                  <TextField disabled={loading} inputRef={register({ required: true })} error={Boolean(errors.email)} variant="outlined" required type="text" fullWidth label="URL" placeholder="http://www.example.com/" name="url" InputLabelProps={{ shrink: true }} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <Paper elevation={1}>
                          <TextField
                            disabled={loading}
                            inputRef={register({ required: true, min: 50 })}
                            error={Boolean(errors.dimensions && errors.dimensions.width)}
                            variant="outlined"
                            required
                            type="number"
                            fullWidth
                            label="Viewport width"
                            placeholder="1366"
                            name="dimensions.width"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Paper elevation={1}>
                          <TextField
                            disabled={loading}
                            inputRef={register({ required: true, min: 50 })}
                            error={Boolean(errors.dimensions && errors.dimensions.height)}
                            variant="outlined"
                            required
                            type="number"
                            fullWidth
                            label="Viewport height"
                            placeholder="768"
                            name="dimensions.height"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={1}>
                      <Controller
                        name="extension"
                        defaultValue="jpg"
                        control={control}
                        register={register}
                        render={({ value, onChange }) => {
                          return (
                            <FormControl disabled={loading} fullWidth variant="outlined">
                              <InputLabel>Download format</InputLabel>
                              <Select value={value} onChange={onChange} label="format">
                                <MenuItem value={"jpg"}>JPEG</MenuItem>
                                <MenuItem value={"png"}>PNG</MenuItem>
                              </Select>
                            </FormControl>
                          );
                        }}
                      ></Controller>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="elementInCenter">
                <Paper elevation={2}>
                  <Button disabled={loading} startIcon={loading ? <CircularProgress size={15} /> : <Camera />} type="submit" variant="contained" color="primary">
                    Screenshot
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </form>
        </Container>
        <History history={history} />
      </div>
      <Grid style={{ position: "fixed", bottom: 0, height: 40, backgroundColor: "#2ECCC0", width: "100%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="body1">To clear history, Close and open a new browser tab</Typography>
      </Grid>
    </React.Fragment>
  );
}
// const doesUrlIncludeHttpsString = url.indexOf("https:") > -1;
// const spliter = doesUrlIncludeHttpsString ? https : http;
// let name;
// let splited = url.split(spliter);
// if (splited[1].indexOf(".") > -1) splited = splited[1].split(".");
//
// if (splited.indexOf("www") > -1) name = splited[1];
// else name = splited[0];
