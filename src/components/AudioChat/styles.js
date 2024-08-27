import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles((theme)=>({
    App:{
        display:'grid',
        placeItems:"center",
        height:'100vh',
        backgroundColor:'#dadbd3'

    },
    Audiocall_container:{
        width: '65%',
        backgroundImage: `url(https://www.jbrhomes.com/wp-content/uploads/blank-avatar.png)`,
    placeContent: 'center',
    alignItems:'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize:' 100% 100%',
    margin:'30px 0px',
    textAlign:'center',
    display:'flex',
    flexDirection:'column'
    
    },
    App_body:{
        display:'flex',
        backgroundColor:'#ededed',
        marginTop:'50px',
        height:'90vh',
        width:'90vw',
        boxShadow:'-1px 4px 20px -6px rgba(0,0,0.75)',
        placeContent:'center'
    },
    icon_button:{
        marginTop:'auto',
        alignContent:'center',
        width:'40px'
    },
    icon:{
        color:'red',
        fontSize:'40px',

    }

}))