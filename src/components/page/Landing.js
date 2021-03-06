import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../molecule/Header";
import {
  Paper,
  Grid,
  Button,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@material-ui/core";
import Container from "../atoms/Container";
import { Controller, useForm, FormProvider } from "react-hook-form";
import Camera from "@material-ui/icons/Camera";
import History from "./History";
import actions from "../../utils/getScreenShot";
import sessionStorage from "../../utils/sessionsStorage";
import SnackBar from "../molecule/SnackBar";
import ViewPort from "./ViewportView";
import UrlField from "../atoms/UrlField";

const trimText = (string) => {
  const length = 80;
  if (string.length > length) return string.substring(0, length - 3);
  return string;
};

const nameGenerator = (url) => {
  return trimText(url)
    .replaceAll("/", "")
    .replaceAll(":", "")
    .replaceAll(".", "");
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
    const historyValue = sessionStorage.get("fullPageHistory", true) || [];
    setHistory(historyValue.map((i) => ({ ...i, loading: false })) || []);
  }, []);

  const { register, handleSubmit, errors, control, watch, reset } = useForm({
    defaultValues: {
      url: "https://salty-badlands-37808.herokuapp.com/",
      dimensions: {
        width: 1366,
        height: 768,
      },
      extension: "jpg",
    },
  });

  const handleHistoryMutator = (url, payload) => {
    const historyClone = [...history];
    const index = historyClone.findIndex((i) => i.url === url);
    if (index > -1)
      historyClone[index] = { ...historyClone[index], ...payload };
    else historyClone.unshift(payload);
    setHistory(historyClone);
    sessionStorage.set("fullPageHistory", historyClone);
  };

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
      handleHistoryMutator(url, { ...options, loading: true });
      actions.getScreenShot(options).then(() => {
        handleHistoryMutator(url, { ...options, loading: false });
      });
      reset({ ...rest, url: "" });

      setLoading((prev) => !prev);
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {error && (
        <SnackBar open={Boolean(error)} variant="error" message={error} />
      )}
      <div style={{ paddingBottom: 40 }}>
        <Container>
          <form onSubmit={handleSubmit(submit)}>
            <Grid
              className="fullWidth"
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12}>
                <Paper elevation={2}>
                  <FormProvider
                    register={register}
                    errors={errors}
                    control={control}
                    watch={watch}
                    loading={loading}
                  >
                    <UrlField />
                  </FormProvider>
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
                            <FormControl
                              required
                              disabled={loading}
                              fullWidth
                              variant="outlined"
                            >
                              <InputLabel>Download format</InputLabel>
                              <Select
                                value={value}
                                onChange={onChange}
                                label="format"
                              >
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
                    <FormProvider
                      register={register}
                      errors={errors}
                      control={control}
                      watch={watch}
                      loading={loading}
                    >
                      <ViewPort />
                    </FormProvider>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="elementInCenter">
                <Paper elevation={2}>
                  <Button
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={15} /> : <Camera />
                    }
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
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
          height: 50,
          backgroundColor: "#2ECCC0",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3000,
          flexDirection: "column",
          padding: 15,
        }}
      >
        <Typography variant="body1">
          To clear history, Close and open a new browser tab
        </Typography>
      </Grid>
    </React.Fragment>
  );
}
