import React from "react"
import PropTypes from "prop-types"
import { styled } from "@mui/material/styles"
import CardContent from "@mui/material/CardContent"
import { Collapse } from "@mui/material"
import Icon from "@mui/material/Icon"
// core components
import styles from "./cardBodyStyle.js"

const NewCardContent = styled(CardContent)(({ theme, ownerState }) => {
  const { className } = ownerState
  return { ...(className !== undefined && className) }
})
export default function CardBody(props) {
  const {
    className,
    children,
    background,
    plain,
    formHorizontal,
    pricing,
    signup,
    color,
    profile,
    calendar,
    expanded,
    clName,
    ...rest
  } = props

  const cardBodyClasses = {
    ...(background && styles.cardBodyBackground),
    ...(plain && styles.cardBodyPlain),
    ...(formHorizontal && styles.cardBodyFormHorizontal),
    ...(pricing && styles.cardPricing),
    ...(signup && styles.cardSignup),
    ...(color && styles.cardBodyColor),
    ...(profile && styles.cardBodyProfile),
    ...(calendar && styles.cardBodyCalendar),
    ...(className !== undefined && className),
  }

  return (
    <NewCardContent
      className={clName}
      ownerState={{
        className: cardBodyClasses,
      }}
      {...rest}
    >
      <Collapse in={expanded !== undefined ? expanded : true}>
        {children}
      </Collapse>
      {expanded !== undefined && !expanded && (
        <div style={{ textAlign: "center" }}>
          <Icon color="primary" style={{ fontSize: 24 }}>
            more_horiz
          </Icon>
        </div>
      )}
    </NewCardContent>
  )
}

CardBody.propTypes = {
  className: PropTypes.object,
  background: PropTypes.bool,
  plain: PropTypes.bool,
  formHorizontal: PropTypes.bool,
  pricing: PropTypes.bool,
  signup: PropTypes.bool,
  color: PropTypes.bool,
  profile: PropTypes.bool,
  calendar: PropTypes.bool,
  children: PropTypes.node,
}
