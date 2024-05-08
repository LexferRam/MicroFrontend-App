const PopUpStyle = {
    modalContainer: {
        zIndex: 10000, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        position: 'fixed', 
        justifyContent: 'center', 
        alignItems: 'center', 
        top: 0, 
        left: 0,
    },
    modalBody: {
        position: 'absolute',
        maxWidth: "80%",
        height: "63%",
        backgroundColor:"white",
        boxShadow: '0 8px 6px -6px black',
        borderRadius:"5px ",

        "@media (max-width: 500px)": {
            justifyContent: 'center',
            width: "90%",
        }
    },
    modalBodyPiramide: {
        position: 'absolute',
        maxWidth: "80%",
        height: "90%",
        backgroundColor:"white",
        boxShadow: '0 8px 6px -6px black',
        borderRadius:"5px ",

        "@media (max-width: 500px)": {
            justifyContent: 'center',
            width: "90%",
            maxWidth: "80%",
        }
    },
    btnClose: {
        position: 'absolute',
        top: 3,
        right: 4,
        width:"20px",
        color:'gray',
        cursor: 'pointer',
        "@media (max-width: 500px)": {
            top: 1,
            right: 1,
        }
    },
    modalImg: {
        width: '100%',
        objectFit: 'cover',
        height: '88%',
        cursor: 'pointer',
        borderRadius:"5px 5px 0 0",
        objectPosition: '2%',
    },
    modalImgPiramide: {
        width: '100%',
        objectFit: 'cover',
        height: '100%',
        cursor: 'pointer',
        borderRadius:"5px 5px 0 0",
        objectPosition: 'center',
    },
    time: {
        color: 'black',
        textAlign: 'center',
        fontSize: '2rem',
        paddingTop: '0.5rem',
        position: 'relative',
        bottom: "40px",
        margin: "4px",
        left: "7px",
        "@media (max-width: 500px)": {
            fontSize: '20px'
        }
    },
    titleModal: {
        color:"black",
        fontSize:"20px",
        fontWeight:"800",
        textAlign:"center",
        marginTop:"20px"
    },
    containerbtn : {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginTop:"10px",
    },
    btn: {
        borderRadius:"4px",
        border:"none",
        color:"white",
        fontSize:"13px",
        width:"250px",
        height:"25px",
        alignContent:"center",
        alignItems:"center",
        display:"flex"
    },
    btnLabel: {
        color:"white",
        padding:"2px",
        "&:hover":{
            textDecoration:"none",
            color:"white",
        }
    },
    containerCounter : {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "1rem"
    }
}

export default PopUpStyle;