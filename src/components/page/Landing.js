import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../molecule/Header";
import { Paper, Grid, TextField, Button, Typography, Divider, FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@material-ui/core";
import Container from "../atoms/Container";
import { Controller, useForm, FormProvider } from "react-hook-form";
import Camera from "@material-ui/icons/Camera";
import History from "./History";
import actions from "../../utils/getScreenShot";
import sessionStorage from "../../utils/sessionsStorage";
import SnackBar from "../molecule/SnackBar";
import ViewPort from "./ViewportView";

const nameGenerator = (url) => {
  return url.replaceAll("/", "").replaceAll(":", "").replaceAll(".", "");
};

const extensionToFormat = {
  jpg: "jpeg",
  png: "png",
  pdf: "pdf",
};

export default function LandingPage() {
  const [loading, setLoading] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const historyValue = sessionStorage.get("fullPageHistory", true);

    setHistory(historyValue || []);
  }, []);

  const { register, handleSubmit, errors, control, watch } = useForm({
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
      let options = {
        
        url,
        ...rest,
        name,
        format: extensionToFormat[rest.extension],
      };
      console.log('options: ', options);
      await actions.getScreenShot(options);
      setLoading((prev) => !prev);
      const historyClone = [...history];
      const index = historyClone.findIndex((i) => i.url === url);
      if (index > -1) historyClone[index] = { ...historyClone[index], ...options };
      else historyClone.unshift(options);
      setHistory(historyClone);
      sessionStorage.set("fullPageHistory", historyClone);
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {error && <SnackBar open={Boolean(error)} variant="error" message={error} />}
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
                  <Grid item md={6} sm={6} xs={12}>
                    <Paper elevation={1}>
                      <Controller
                        name="extension"
                        defaultValue="jpg"
                        control={control}
                        register={register}
                        render={({ value, onChange }) => {
                          return (
                            <FormControl required disabled={loading} fullWidth variant="outlined">
                              <InputLabel>Download format</InputLabel>
                              <Select value={value} onChange={onChange} label="format">
                                <MenuItem value={"jpg"}>JPEG</MenuItem>
                                <MenuItem value={"png"}>PNG</MenuItem>
                                <MenuItem value={"pdf"}>PDF</MenuItem>
                              </Select>
                            </FormControl>
                          );
                        }}
                      ></Controller>
                    </Paper>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <FormProvider register={register} errors={errors} control={control} watch={watch} loading={loading}>
                      <ViewPort />
                    </FormProvider>
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
      <Grid
        style={{
          position: "fixed",
          bottom: 0,
          height: 40,
          backgroundColor: "#2ECCC0",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3000,
        }}
      >
        <Typography variant="body1">To clear history, Close and open a new browser tab</Typography>
      </Grid>
    </React.Fragment>
  );
}

/*
 • in mobile make the dimensions in one row -- DONE
 • PDF format missing
 • empty state for table -- DONE
 • "url" should be all caps - URL -- DONE
 • the app was not working for me on mobile, it was stuck in processing.
 • I wouldn't keep the loader if the screenshot is taking a lot of time, I would add an entry immediately to the table and show a processing tag.
 • preview before download would be a good feature
 • what happens if we refresh the window when screenshot is provessing?
*/
