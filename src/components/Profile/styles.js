import { makeStyles } from "@material-ui/core";


export const useStyles=makeStyles((theme)=>({
    profile_container:{
        display:'grid',
        placeItems:'center',
        height:'100vh',
        backgroundColor:'#dadbd3',
    },
    profile_body:{
        display:'flex',
        backgroundColor:'#ededed',
        marginTop:'50px',
        height:'75vh',
        width:'90vw',
        flexDirection:'column',
        boxShadow:'-1px 4px 20px -6px rgba(0,0,0.75)',
        padding:'20px',
        overflow:'scroll',
    },
    profile_content:{
        flex:'1',
        display:'flex',
    },
    profile_avatar:{
        flex:'.35',
    },
    profile_details:{
        flex:'.65',
    },
    profile_avatar_img:{
        width:'100%',
        height:'100%',
    },
    details_p:{
        fontSize:'20px',
        margin:'5px 0',
        height:'60px',
        boxShadow:' -1px 4px 20px -6px rgba(0,0,0.75)',
        display:'flex',
        placeItems:'center',
        paddingLeft:'30px',
        
    },
    Dialog_input:{
        borderWidth:'0px',
        boxShadow:'-14px 11px 9px -13px rgb(0 0 1);',
        fontSize:'20px',
        width:'-webkit-fill-available',
    },

}))