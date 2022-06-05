import { Menu, MenuItem } from '@material-ui/core'
import { Call, Close, MoreVert,Videocam } from '@material-ui/icons';
import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { CALLING_USER } from '../../redux/constants/actionType';
function MenuIcon() {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleVideoCall = (e) => {
    e.preventDefault()
    dispatch({ type: CALLING_USER })
    navigate('/videochat')
  }

  const handleAudioCall=(e)=>{
    e.preventDefault()
    dispatch({type:CALLING_USER})
    navigate('/audiochat')
  }
  return (
    <div>

      <MoreVert onClick={handleMenu} />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >


        <MenuItem onClick={handleClose}><Close /></MenuItem>
        <MenuItem onClick={handleVideoCall}><Videocam /></MenuItem>
        <MenuItem onClick={handleAudioCall}><Call /></MenuItem>
      </Menu>
    </div>
  )
}

export default MenuIcon