import { Avatar, Grid ,Button,CircularProgress} from '@material-ui/core'
import React, { useEffect } from 'react'
import { styles } from './styles'
import {useDispatch, useSelector} from 'react-redux'
import { addToContacts, fecthAllUsers } from '../../redux/actions/Auth'
function Contacts() {
    const classes = styles()
    const dispatch=useDispatch()
    const {allUsers,user,loading}=useSelector(state=>state.AuthReducer)
    useEffect(()=>{
        dispatch(fecthAllUsers(user._id))
    },[])

    const handleClick=({phoneNumber,_id,name})=>{
        dispatch(addToContacts({phoneNumber,name,_id,userId:user._id}))

        
    }
    

    if(loading){
        return(
            <div className={classes.users_container}>
                <div className={classes.user_body}>
                    <div style={{margin:'auto',width:'50%'}}>
                        <CircularProgress/>
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div className={classes.users_container}>
            <div className={classes.users_body}>
                {
                    allUsers?.map(({name,phoneNumber,_id,avatar})=>(
                        <div key={_id} className={classes.user} >
                                <Avatar src={avatar} />
                                <p className={classes.user_details}>{name}</p>
                                <p className={classes.user_details}>{phoneNumber}</p>
                                <Button variant='contained' color='primary' className={classes.user_details} style={{marginLeft:'auto'}} onClick={()=>handleClick({name,phoneNumber,_id})}>Add-Chat</Button>
                        </div>
                        
                    ))
                }
                {
                    !allUsers?.length &&(
                        <div className={classes.empty_user_body}>
                            <h1 className={classes.empty_user_message}>user is empty</h1>
                        </div>
                    )
                }
               
                   
                </div>
        </div>
    )
}

export default Contacts