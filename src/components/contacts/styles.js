import { makeStyles } from "@material-ui/core";

export  const styles=makeStyles((theme)=>({
    users_container:{
        display:'grid',
        placeItems:'center',
        height:'100vh',
        backgroundColor:'#dadbd3',
    },
    users_body:{
        display:'flex',
        backgroundColor:'#ededed',
        marginTop:'50px',
        height:'90vh',
        width:'90vw',
        boxShadow:'-1px 4px 20px -6px rgba(0,0,0.75)',
    },
    users_chat:{
        flex:'1',
        overflow: 'scroll',
    },
}))