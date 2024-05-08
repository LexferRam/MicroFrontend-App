import React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles"
import Badge from "../Badge/Badge"
import timeLineStyles from "./timelineStyle.js";

const NewUL = styled("ul")(({ theme, ownerState }) => {
  const newStyles = timeLineStyles(theme)
  const { simple } = ownerState
  return {
    ...newStyles.timeline,
    ...(simple && newStyles.timelineSimple)
  }
})

const LiItem = styled("li")(({ theme }) => {
  const newStyles = timeLineStyles(theme)
  return {
    ...newStyles.item,
  }
})

const NewH6 = styled("h6")(({ theme }) => {
  const newStyles = timeLineStyles(theme)
  return {
    ...newStyles.footerTitle,
  }
})

const DivBadget = styled("div")(({ theme, ownerState }) => {
  const newStyles = timeLineStyles(theme)
  const { simple, badgeColor} = ownerState
  return {
    ...newStyles.timelineBadge,
    ...newStyles[badgeColor],
    ...(simple && newStyles.timelineSimpleBadge)
  }
})

const DivPanel = styled("div")(({ theme, ownerState }) => {
  const newStyles = timeLineStyles(theme)
  const { simple, inverted} = ownerState
  return {
    ...newStyles.timelinePanel,
    ...(simple && newStyles.timelineSimplePanel),
    ...( inverted && newStyles.timelinePanelInverted)
  }
})

const DivStyle = styled("div")(({ theme, ownerState }) => {
  const newStyles = timeLineStyles(theme)
  const { style } = ownerState
  return {
    ...newStyles[style],
  }
})

const NewHR = styled("hr")(({ theme }) => {
  const newStyles = timeLineStyles(theme)
  return {
    ...newStyles.footerLine
  }
})

export default function Timeline(props) {
  
  const { stories, simple } = props;
  const theme = useTheme()
  const styles = timeLineStyles(theme)
  
  return (
    <NewUL ownerState={{
      simple:simple
    }}>
      {stories.map((prop, key) => {

        return (
          <LiItem key={key}>
            {prop.badgeIcon ? (
              <DivBadget ownerState={{
                simple:simple,
                badgeColor:prop.badgeColor
              }}>
                <prop.badgeIcon className={styles.badgeIcon} />
              </DivBadget>
            ) : null}
            <DivPanel ownerState={{
                simple:simple,
                inverted:prop.inverted
              }}>
              {prop.title ? (
                <DivStyle ownerState={{
                  style:"timelineHeading",
                }}>
                  <Badge color={prop.titleColor}>{prop.title}</Badge>
                </DivStyle>
              ) : null}
              <DivStyle ownerState={{
                  style:"timelineBody",
                }}>
                  {prop.body}
                </DivStyle>
              {prop.footerTitle ? (
                <NewH6 >{prop.footerTitle}</NewH6>
              ) : null}
              {prop.footer ? <NewHR /> : null}
              {prop.footer ? (
                <DivStyle ownerState={{
                  style:"timelineFooter",
                }}>
                  {prop.footer}
                </DivStyle>
              ) : null}
            </DivPanel>
          </LiItem>
        );
      })}
    </NewUL>
  );
}

Timeline.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool
};
