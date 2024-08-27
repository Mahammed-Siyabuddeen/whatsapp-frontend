import { makeStyles } from "@mui/styles";import { textAlign } from "@mui/system";

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
        height:'75vh',
        width:'90vw',
        flexDirection:'column',
        boxShadow:'-1px 4px 20px -6px rgba(0,0,0.75)',
        padding:'20px',
        overflow:'scroll',
    },
    user:{
      minHeight:'30px'  ,
      padding:'15px',
      fontSize:'larger',
      boxShadow: '1px 1px 15px -6px rgb(191 191 231)',
      display:'flex',
      '&:hover':{
          backgroundColor:'#cfcfcf'
      }

    },
    user_details:{
        marginLeft:'5%',
    },
    users_chat:{
        flex:'1',
        overflow: 'scroll',
    },
    empty_user_body:{
        backgroundColor:'#d5dedd',
        textAlign:'center',
        placeItems:'center',
        height:'100%'
    },
    empty_user_message:{
        placeItems:'center',
        marginTop:'15%',
    }
}))