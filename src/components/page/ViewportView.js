import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
const ViewPort = () => {
  const { control, register, errors, loading, watch } = useFormContext();
  const downloadFormat = watch("extension");
  const isDownloadFormatPdf = downloadFormat === "pdf";

  if (isDownloadFormatPdf)
    return (
      <React.Fragment>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Controller
                name="dimensions.pdfFormat"
                defaultValue="A4"
                control={control}
                register={register}
                render={({ value, onChange }) => {
                  return (
                    <FormControl required disabled={loading} fullWidth variant="outlined">
                      <InputLabel>Pdf format</InputLabel>
                      <Select value={value} onChange={onChange} label="format">
                        <MenuItem value={"A4"}>A4</MenuItem>
                        <MenuItem value={"A3"}>A3</MenuItem>
                      </Select>
                    </FormControl>
                  );
                }}
              ></Controller>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );

  const colSize = 6;

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2}>
        <Grid item md={colSize} sm={colSize} xs={12}>
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
        <Grid item md={colSize} sm={colSize} xs={12}>
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
    </React.Fragment>
  );
};

export default ViewPort;

{
  /* <TextField
disabled={loading}
inputRef={register({ required: true, min: 50 })}
error={Boolean(errors.dimensions && errors.dimensions.pdfFormat)}
variant="outlined"
required
type="number"
fullWidth
label="Pdf Format"
placeholder="1366"
name="dimensions.pdfFormat"
InputLabelProps={{ shrink: true }}
/> */
}
