import React from "react";
import { styled } from '@mui/material'
import PropTypes from "prop-types";
import styles from "./cardFooterStyle.js";

const StyledCardFooter = styled("div")(({ ownerState }) => {
  const {
    color,
    plain,
    profile,
    pricing,
    testimonial,
    stats,
    chart,
    product,
    className,
  } = ownerState;
  return {
    ...styles.cardFooter,
    ...(plain && styles.cardFooterPlain),
    ...(profile && styles.cardFooterProfile),
    ...(pricing && styles.cardFooterPricing),
    ...(testimonial && styles.cardFooterTestimonial),
    ...(stats && styles.cardFooterStats),
    ...(chart && styles.cardFooterChart),
    ...(product && styles.cardFooterProduct),
    ...(color && styles[color + "CardFooter"]),
    ...(className !== undefined && className),
  };
})

export default function CardFooter(props) {
  const {
    className,
    color,
    children,
    plain,
    profile,
    pricing,
    testimonial,
    stats,
    chart,
    product,
    ...rest
  } = props;

  return (
    <StyledCardFooter ownerState={{
      className: className,
      color: color,
    }} {...rest}>
      {children}
    </StyledCardFooter>
  );
}

CardFooter.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  stats: PropTypes.bool,
  chart: PropTypes.bool,
  product: PropTypes.bool,
  children: PropTypes.node
};
