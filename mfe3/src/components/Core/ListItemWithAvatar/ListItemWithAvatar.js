import React from "react"
import PropTypes from "prop-types";


// MUI components
import { styled } from "@mui/material/styles"
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import styles from "./listItemWithAvatarStyle.js";

const NewAvatar = styled(Avatar)(({ theme }) => ({
    ...styles.avatar
  }));
  


export default function ListItemWithAvatar(props) {
    const { theElement, elementKey, text, secondText } = props;
    function onListItemClick(e) {
        if (props.onListItemClick) {
            props.onListItemClick(e);
        }
    }
    return (
        <ListItem button onClick={() => onListItemClick(theElement)} key={elementKey}>
            <ListItemAvatar>
                <NewAvatar>
                   {props.children}
                </NewAvatar>
            </ListItemAvatar>
            <ListItemText primary={text} secondary={secondText}/>
        </ListItem>
    )
}

ListItemWithAvatar.propTypes = {
    theElement: PropTypes.object,
    elementKey: PropTypes.string,
    text: PropTypes.string,
    secondText:PropTypes.string,
    onListItemClick: PropTypes.func
  };
