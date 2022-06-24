import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from './styles'
import {useDispatch, useSelector} from 'react-redux'
import { Create } from '@material-ui/icons'
import { updateProfile } from '../../redux/actions/Auth'
function Profile() {
    const classes=useStyles()

    const {user}=useSelector(state=>state.AuthReducer)
    const {name,phoneNumber,email,avatar,_id}=user
    const [open,setOpen]=useState(false)
    const [stateValue,setStateValue]=useState()
    const dispatch=useDispatch()
    const openDialog=({type,data,_id})=>{
      setStateValue({type,data,_id})
      setOpen(true)

    }
    const handleSubmit=(e)=>{
        dispatch(updateProfile(stateValue))
        setOpen(false)
    }
  return (
    <div className={classes.profile_container}>
        <div className={classes.profile_body}>
            <h1 style={{fontSize:'50px',margin:'20px 0'}}>proflie</h1>
            <div className={classes.profile_content}>
                <div className={classes.profile_avatar}>
                  <Avatar className={classes.profile_avatar_img} src={avatar}/>
                  <Button onClick={()=>openDialog({type:'avatar',data:avatar,_id})} style={{margin:'-17px 0 5px 10px'}}> < Create/></Button>
                </div>
                <div className={classes.profile_details}>
                  <div style={{marginLeft:'30px'}}>
                      <div>name:<div onClick={()=>openDialog({type:'name',data:name,_id})} className={classes.details_p}>{name}</div></div>
                      <div>Phone number :<div  onClick={()=>openDialog({type:'phoneNumber',data:phoneNumber,_id})}className={classes.details_p}>{phoneNumber}</div></div>
                      <div>Email:<div onClick={()=>openDialog({type:'email',data:email,_id})} className={classes.details_p}>{email}</div></div>
                  
                  </div>
                    
                </div>
            </div>
        </div>
        <Dialog open={open}  fullWidth>
          <DialogTitle>name</DialogTitle>
          {
            stateValue?.type==='avatar'?
            (
              <DialogContent><input onChange={(e)=>setStateValue({...stateValue,'data':e.target.files[0]})} accept='image/*' type='file'   className={classes.Dialog_input} /></DialogContent>

            ):
            (

              <DialogContent><input onChange={(e)=>setStateValue({...stateValue,'data':e.target.value})}   className={classes.Dialog_input} value={stateValue?.data||''}/></DialogContent>
            )

          }
          <DialogActions>
            <Button variant='contained'color='secondary' onClick={()=>setOpen(false)}>Cancel</Button>
            <Button variant='contained' color='primary' onClick={()=>handleSubmit()}>Save</Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default Profile