import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles"
import CoreCard from "@mui/material/Card";

// core components
import styles from "./cardStyle.js";

import { IconButton, Tooltip } from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NewCard = styled("div")(({ theme, ownerState }) => {
  const { color, plain, profile, blog, raised, background, pricing, product, testimonial, chart,
    login, fixed, className } = ownerState

    let fixedStyle;

  return {
    ...styles.card,
    ...(color && styles[color]),
    ...(plain && styles.cardPlain),
    ...((profile || testimonial) && styles.cardProfile),
    ...(blog && styles.cardBlog),
    ...(raised && styles.cardRaised),
    ...(background && styles.cardBackground),
    ...(pricing && styles.cardPricing),
    ...(product && styles.cardProduct),
    ...(chart && styles.cardChart),
    ...(login && styles.cardLogin),
    ...( !fixed && styles.relative),
    ...( fixed && styles.fixed),
    ...(((pricing && color !== undefined) || (pricing && background !== undefined)) && styles.cardPricingColor),
    ...(className !== undefined && className)

  }

});


export default function Card(props) {
  
  const {
    children,
    color,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    product,
    testimonial,
    chart,
    login,
    fixed,
    className,
    collapse,
    handleCollapseCard,
    expanded,
    clName,
    ...rest
  } = props;
  const windowGlobal = typeof window !== 'undefined' && window;
  const [state, setState] = React.useState({
    width: (windowGlobal) ? window.innerWidth : 960
  });
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return function cleanup() {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  });
  const handleWindowSizeChange = () => {


    setState({ width: (windowGlobal) ? window.innerWidth : 960 });
  };

  return (

    <NewCard className={clName} ownerState={{
      color: color,
      plain: plain,
      profile: profile,
      blog: blog,
      raised: raised,
      background: background,
      pricing: pricing,
      product: product,
      testimonial: testimonial,
      chart: chart,
      login: login,
      fixed: fixed,
      state: state,
      className: className
    }}  {...rest} >

      {collapse !== undefined &&
        <Tooltip title="Expandir" placement="right" arrow sx={{
          position: 'absolute',
          top: '2px',
          right: '-5px',
          zIndex: '99',
        }}>
          <IconButton color="primary" onClick={handleCollapseCard}>
            {!expanded ?
              <ExpandMoreIcon />
              :
              <ExpandLessIcon />
            }

          </IconButton>
        </Tooltip>
      }
      {children}
    </NewCard>
  );
}

Card.defaultProps = {
  fixed: false
};

Card.propTypes = {
  className: PropTypes.object,
  fixed: PropTypes.bool,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  blog: PropTypes.bool,
  raised: PropTypes.bool,
  background: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  product: PropTypes.bool,
  chart: PropTypes.bool,
  login: PropTypes.bool,
  children: PropTypes.node,
  expansion: PropTypes.bool
};
