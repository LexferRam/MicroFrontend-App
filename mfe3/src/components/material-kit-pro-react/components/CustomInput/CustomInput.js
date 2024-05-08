import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

// @material-ui/icons
import Clear from "@mui/icons-material/Clear";
import Check from "@mui/icons-material/Check";
// core components

import styles from "./customInputStyle.js";

const NewFormControl = styled(FormControl)(({ theme, ownerState }) => {
  const { className  } = ownerState
  return {
    ...styles.formControl,
    ...(className !== undefined && className),
  }
})

const NewInputLabel = styled(InputLabel)(({ theme, ownerState }) => {
  const { error, success  } = ownerState
  return {
    ...styles.labelRoot,
    ...(error && styles.labelRootError),
    ...(success && !error && styles.labelRootSuccess)
  }
})

const NewClearIcon = styled(Clear)(({ theme }) => ({
  ...styles.feedback,
  ...styles.labelRootError,
}))

const NewCheckIcon = styled(Check)(({ theme }) => ({
  ...styles.feedback,
  ...styles.labelRootSuccess,
}))

export default function CustomInput(props) {
  const {
    className,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success
  } = props;
  
  const inputClasses = {
    ...styles.input,
    ...(white && styles.whiteInput) 
  }
  const marginTop = {
    ...(inputRootCustomClasses !== undefined && inputRootCustomClasses) 
  };
  
  const underlineClasses = {
    ...(styles.underline),
    ...(error && styles.underlineError),
    ...(success && !error && styles.underlineSuccess),
    ...(white && styles.whiteUnderline)
  }

  return (
    <NewFormControl  ownerState={{
      className: className,
    }} {...formControlProps} >
      {labelText !== undefined ? (
        <NewInputLabel
          htmlFor={id}
          {...labelProps}
          ownerState={{
            error: error,
            success: success,
          }}
        >
          {labelText}
        </NewInputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: styles.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <NewClearIcon />
      ) : success ? (
        <NewCheckIcon />
      ) : null}
    </NewFormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};
