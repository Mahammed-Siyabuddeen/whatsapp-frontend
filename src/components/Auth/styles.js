import { makeStyles } from "@material-ui/core";


export default makeStyles((theme)=>({
    form:{
        width: '100%', 
        marginTop: theme.spacing(3),
    },
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
          },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
      },
    submit:{
        backgroundColor:'#a6ff4d',
        height:'60px',
        margin: theme.spacing(3, 0, 2),
        '&:hover': {
            backgroundColor:'#a6ff4d',

        }
    },
}))