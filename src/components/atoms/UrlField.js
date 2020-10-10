import React from "react";
import AccountCircle from "@material-ui/icons/LinkSharp";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import { TextField, IconButton } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import IframeModal from "../molecule/Iframe";
import Tooltip from "@material-ui/core/Tooltip";
const UrlField = () => {
  const [preview, setPreview] = React.useState(false);
  const { register, errors, loading, watch } = useFormContext();
  const url = watch("url");


  return (
    <React.Fragment>
      {preview && (
        <IframeModal
          handleClose={() => setPreview(false)}
          open={preview}
          url={url}
        />
      )}
      <TextField
        disabled={loading}
        inputRef={register({ required: true })}
        error={Boolean(errors.email)}
        variant="outlined"
        required
        type="text"
        fullWidth
        label="URL"
        placeholder="http://www.example.com/"
        name="url"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
              size="small"
                onClick={() => setPreview((prev) => !prev)}
                disabled={!Boolean(url)}
              >
                <Tooltip
                  title={
                    <>
                      <p>Preview of given URL</p>
                      <p>Note: Some urls cannot be previewed</p>
                    </>
                  }
                >
                  <Visibility color={!Boolean(url) ? "" : "primary"} />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </React.Fragment>
  );
};

export default UrlField;
