import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useStyles } from '../Profile/styles'
function ContactInfo() {
    const classes=useStyles()
    const {currentRoom}=useSelector(state=>state.RoomReducer)
    const{name,avatar,email,phoneNumber}=currentRoom
  return (
    <div className={classes.profile_container}>
        <div className={classes.profile_body}>
            <h1 style={{fontSize:'50px',margin:'20px 0'}}>proflie</h1>
            <div className={classes.profile_content}>
                <div className={classes.profile_avatar}>
                  <Avatar className={classes.profile_avatar_img} src={avatar}/>
                </div>
                <div className={classes.profile_details}>
                  <div style={{marginLeft:'30px'}}>
                      <div>name:<div  className={classes.details_p}>{name}</div></div>
                      <div>Phone number :<div  className={classes.details_p}>{phoneNumber}</div></div>
                      <div>Email:<div  className={classes.details_p}>{email}</div></div>
                  
                  </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactInfo