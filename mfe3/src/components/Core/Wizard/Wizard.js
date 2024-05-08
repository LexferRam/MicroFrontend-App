import React, { useState, useEffect, useRef } from "react"

// @Mui components
import { styled } from "@mui/material/styles"

//Core Components
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button"
//import Card from 'components/material-dashboard-pro-react/components/Card/Card'
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import wizardStyle from "./wizardStyle.js"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...wizardStyle[style] }
})

const NewH3 = styled("h3")(({ theme }) => {
  return { ...wizardStyle.title }
})

const NewH5 = styled("h5")(({ theme }) => {
  return { ...wizardStyle.subtitle }
})

const NewA = styled("a")(({ theme }) => {
  return { ...wizardStyle.stepsAnchor }
})

export default function Wizard(props) {
  const { title, subtitle, color, steps } = props
  const wizard = useRef()
  const tabsRef = useRef([])

  if (tabsRef.current.length !== steps) {
    tabsRef.current = steps.map((_, i) => React.createRef())
  }

  var width = 100 / props.steps.length + "%"

  const windowGlobal = typeof window !== "undefined" && window
  const smallView =
    props.smallView !== "undefined"
      ? props.smallView
      : windowGlobal && window.innerWidth < 600

  var size
  if (smallView) {
    size = 12
  } else {
    switch (props.steps.length) {
      case 1:
        size = 12
        break
      case 2:
        size = 6
        break
      default:
        size = 4
        break
    }
  }

  const [stswizard, setstswizard] = useState({
    currentStep: 0,
    color: props.color,
    nextButton: props.steps.length > 1 ? true : false,
    previousButton: false,
    finishButton: props.steps.length === 1 ? true : false,
    width: width,
    movingTabStyle: {
      transition: "transform 0s",
    },
    allStates: {},
  })

  function updateWidth() {
    refreshAnimation(stswizard.currentStep)
  }

  async function nextButtonClick() {
    tabsRef.current[stswizard.currentStep].current.isValidated(postValidate)
  }

  function postValidate(params) {
    const data =
      tabsRef.current[stswizard.currentStep].current.sendState !== undefined
        ? {
            [props.steps[stswizard.currentStep].stepId]: params,
          }
        : undefined
    var key = stswizard.currentStep + 1
    refreshAnimation(key, data)
  }

  function previousButtonClick() {
    var key = stswizard.currentStep - 1
    refreshAnimation(key)
  }

  function finishButtonClick() {
    if (tabsRef.current[stswizard.currentStep].current != null) {
      if (
        (props.validate === false && props.finishButtonClick !== undefined) ||
        (props.validate &&
          ((tabsRef.current[stswizard.currentStep].current.isValidated !==
            undefined &&
            tabsRef.current[stswizard.currentStep].current.isValidated()) ||
            tabsRef.current[stswizard.currentStep].current.isValidated ===
              undefined) &&
          props.finishButtonClick !== undefined)
      ) {
        props.finishButtonClick(stswizard.allStates)
      }
    } else {
      props.finishButtonClick(stswizard.allStates)
    }
  }

  function refreshAnimation(index, data) {
    var total = props.steps.length
    var li_width = 100 / total
    var total_steps = props.steps.length
    var move_distance = wizard.current.children[0].offsetWidth / total_steps
    var index_temp = index
    var vertical_level = 0

    //var mobile_device = window.innerWidth < 600 && total > 3;
    var mobile_device = smallView && total > 3

    if (mobile_device) {
      move_distance = wizard.current.children[0].offsetWidth / 2
      index_temp = index % 2
      li_width = 50
    }

    var step_width = move_distance
    move_distance = move_distance * index_temp

    var current = index + 1

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10)
      vertical_level = vertical_level * 38
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
    }
    setstswizard({
      ...stswizard,
      currentStep: index,
      nextButton: props.steps.length > index + 1 ? true : false,
      previousButton: index > 0 ? true : false,
      finishButton: props.steps.length === index + 1 ? true : false,
      width: li_width + "%",
      movingTabStyle: movingTabStyle,
      allStates: {
        ...stswizard.allStates,
        ...(data !== undefined ? data : ""),
      },
    })
  }

  const wizardMovingTabAndPrimary = {
    ...wizardStyle.movingTab,
    ...wizardStyle["primary"],
  }

  return (
    <NewDiv
      ownerState={{
        style: "wizardContainer",
      }}
      ref={wizard}
    >
      {title || subtitle ? (
        <NewDiv
          ownerState={{
            style: "wizardHeader",
          }}
        >
          <NewH3>{title}</NewH3>
          <NewH5>{subtitle}</NewH5>
        </NewDiv>
      ) : null}
      <NewDiv
        ownerState={{
          style: "wizardNavigation",
        }}
      >
        <GridContainer className={wizardStyle.nav}>
          {steps.map((prop, key) => {
            return (
              <GridItem
                xs={12}
                sm={size}
                md={size}
                className={
                  stswizard.currentStep != key
                    ? !smallView
                      ? wizardStyle.steps
                      : wizardStyle["stepContent"]
                    : wizardMovingTabAndPrimary
                }
                key={key}
              >
                <NewA>{prop.stepName}</NewA>
              </GridItem>
            )
          })}
        </GridContainer>
      </NewDiv>
      <NewDiv
        ownerState={{
          style: "content",
        }}
      >
        {steps.map((prop, key) => {
          return (
            <NewDiv
              ownerState={{
                style:
                  stswizard.currentStep === key
                    ? "stepContentActive"
                    : "stepContent",
              }}
              key={key}
            >
              <prop.stepComponent
                ref={tabsRef.current[key]}
                allStates={stswizard.allStates}
                previousAction={previousButtonClick}
                nextAction={nextButtonClick}
                currentStep={stswizard.currentStep}
              />
            </NewDiv>
          )
        })}
      </NewDiv>
      <NewDiv
        ownerState={{
          style: "footer",
        }}
      >
        <NewDiv
          ownerState={{
            style: "left",
          }}
        >
          {stswizard.previousButton ? (
            <Button
              size={smallView ? "sm" : "md"}
              //className=""
              onClick={() => previousButtonClick()}
            >
              Anterior
            </Button>
          ) : null}
        </NewDiv>
        <NewDiv
          ownerState={{
            style: "right",
          }}
        >
          {stswizard.nextButton ? (
            <Button
              size={smallView ? "sm" : "md"}
              color="primary"
              //className=""
              onClick={() => nextButtonClick()}
            >
              Siguiente
            </Button>
          ) : null}
          {stswizard.finishButton ? (
            <Button
              size={smallView ? "sm" : "md"}
              color="primary"
              //className=""
              onClick={() => finishButtonClick()}
            >
              Finalizar
            </Button>
          ) : null}
        </NewDiv>
        <NewDiv
          ownerState={{
            style: "clearfix",
          }}
        />
      </NewDiv>
    </NewDiv>
  )
}
