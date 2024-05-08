import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles"
import { Icon } from '@mui/material';

import styles from "./infoBudgetStyle.js";

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style, iconColor, vertical, justificar, className } = ownerState

  return {
    ...(style && styles[style]),
    ...(iconColor && styles[iconColor]),
    ...(vertical && styles.iconWrapperVertical),
    ...(justificar && styles.p),
    ...(className !== undefined && className),
  }
})

const NewH4 = styled("h4")(({ theme, ownerState }) => {
  const { titlecenter } = ownerState
  return {
    ...styles.title,
    ...(titlecenter && styles.titlecenter),
  }
})
const NewP = styled("p")(({ theme }) => ({
  ...styles.description,
}))

const NewIcon = styled(Icon)(({ theme, ownerState }) => {
  const { vertical } = ownerState
  return {
    ...styles.icon,
    ...(vertical && styles.iconVertical),
  }
})

export default function InfoAreaBudget(props) {
  const { title, description, iconColor, vertical, className, titlecenter } = props;

  const iconStyle = {
    width: "2.25rem",
    height: "2.25rem",
    fontSize: "2.25rem",
  }
  
  let icon = null;

  switch (typeof props.icon) {
    case "string":
      icon = <NewIcon ownerState={{
        vertical: vertical,
      }} >
        {props.icon}
      </NewIcon>
      break;
    default:
      icon = (
        <props.icon
          sx={{
            ...iconStyle,
            ...(vertical && styles.iconVertical),
            ...(iconColor && styles[iconColor]),
          }}
        />
      )
      break;
  }
  return (
    
      <NewDiv
      ownerState={{
        style: "infoArea",
        className: className,
      }}
    >{icon != null && (
      <NewDiv
        ownerState={{
          style: "iconWrapper",
          iconColor: {iconColor},
          vertical: {vertical},
        }}
      >
        {icon}
      </NewDiv>
    )}

<NewDiv
        ownerState={{
          style: "descriptionWrapper",
        }}
      >
        <NewH4 ownerState={{
        titlecenter: titlecenter
      }}>
        {title}
      </NewH4>
        <NewP> {description}</NewP>
      </NewDiv>
    </NewDiv>
  );
}

InfoAreaBudget.defaultProps = {
  iconColor: "gray"
};

InfoAreaBudget.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  vertical: PropTypes.bool,
  className: PropTypes.object
};
