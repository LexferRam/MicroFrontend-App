import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"
import CoreCard from "@mui/material/Card";
import styles from "./cardStyle.js";

const NewCard = styled("div") (({ theme, ownerState }) => {
  const {className, plain, profile, blog, raised, background, pricing, color, product, testimonial} = ownerState
  return { 
    ...styles.card,
    ...(plain && styles.cardPlain),
    ...( (profile || testimonial) && styles.cardProfile),
    ...(blog && styles.cardBlog),
    ...(raised && styles.cardRaised),
    ...(background && styles.cardBackground),
    ...(((pricing && color !== undefined) || (pricing && background !== undefined)) && styles.cardPricingColor),
    ...(color && styles[color]),
    ...(pricing && styles.cardPricing),
    ...(product && styles.cardProduct),
    ...(className !== undefined && className)
   }
});

export default function Card(props) {
  const {
    className,
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color,
    product,
    testimonial,
    ...rest
  } = props;

  
  
  return (
    <NewCard ownerState={{
      color: color,
      plain: plain,
      profile: profile,
      blog: blog,
      raised: raised,
      background: background,
      pricing: pricing,
      product: product,
      testimonial: testimonial,
      className: className
    }}  {...rest}>
      {children}
    </NewCard>
  );
}

Card.propTypes = {
  className: PropTypes.object,
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
  children: PropTypes.node
};
