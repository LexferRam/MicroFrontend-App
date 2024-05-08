import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import { Avatar } from '@mui/material';
import styles from "./SectionCoberturasStyle.js";



const NewDiv = styled("div")(({ theme, className}) => {
  const stylesAvatar = {
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1)
      },
      marginBottom: "60px"
    },
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      boxShadow: "-5px 3px 11px 3px rgb(153, 153, 153)"
    },
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
      boxShadow: "unset"
    },
    p: {
      textAlign: 'justify',
    },
    toSmallView: {
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "80px"
    },
    viewLarge: {
      "@media (max-width: 768px)": {
        display: "none"
      }
    },
    viewSmall: {
      "@media (min-width: 768px)": {
        display: "none"
      }
    },
    dSized14: {
      textAlign: 'justify',
      fontSize: "14px!important",
    }
  };
  let finalStyle
  switch (typeof className) {
    case "string":
      finalStyle = (className === 'rootAndToSmallView' ? {...stylesAvatar.root, ...stylesAvatar.toSmallView} : stylesAvatar[className])
      break;
    default:
      finalStyle = className;
      break;
  }
  return {...finalStyle}
});


const NewH4 = styled("h4")(({ theme, className}) => ({
  ...className,
}));

const NewAvatar = styled(Avatar)(({ theme, className}) => {
  const stylesAvatar = {
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
      boxShadow: "unset"
    },
  };
  let finalStyle
  switch (typeof className) {
    case "string":
      finalStyle = stylesAvatar[className]
      break;
    default:
      finalStyle = className;
      break;
  }
  return {...finalStyle}
});

export default function SectionCoberturas(props) {
  const { title, description,image, derecha} = props;
  
  return (
    <>
      <NewDiv className="viewLarge">
        <NewDiv className="root">
            {!props.derecha &&<NewAvatar alt={title} src={image} className={"large"} variant="square" />}
             <NewDiv className={styles.descriptionWrapper}>
               <NewH4 className={styles.title}>{title}</NewH4>
               <NewDiv className={styles.description}>
                 {/*<ReactMarkdown className={classesAvatar.p} source={description} />*/}
                 <NewDiv className="dSized14" dangerouslySetInnerHTML={{ __html: description }}/>
               </NewDiv>
             </NewDiv>
           {props.derecha &&<NewAvatar alt={title} src={image} className={"large"} variant="square" />}
         </NewDiv>
      </NewDiv>
      <NewDiv className="viewSmall">
        <NewDiv className="rootAndToSmallView">
      {!props.derecha &&<NewAvatar alt={title} src={image} className={"large"}  variant="square" />}
          {props.derecha &&<NewAvatar alt={title} src={image} className={"large"} variant="square" />}
          <NewDiv className={styles.descriptionWrapper}>
            <NewH4 className={styles.title}>{title}</NewH4>
            <NewDiv className={styles.description}>
              {/*<ReactMarkdown className={classesAvatar.p} source={description} />*/}
              <NewDiv className="dSized14" dangerouslySetInnerHTML={{ __html: description }}/>
            </NewDiv>
          </NewDiv>
        </NewDiv>
      </NewDiv>
    </>
  );
}

SectionCoberturas.propTypes = {
  image: PropTypes.string,
  derecha: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
};
