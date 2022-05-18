import { Button, Menu, MenuItem } from '@material-ui/core'
import { Call, Close, MoreVert, VideoCall, Videocam } from '@material-ui/icons';
import React, { useState } from 'react'

function MenuIcon() {
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClose = () => {
        setAnchorEl(null);
      };
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
  return (
      <div>
          
          <MoreVert onClick={handleMenu}/>
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
                 
            
            <MenuItem onClick={handleClose}><Close/></MenuItem>
            <MenuItem onClick={null}><Videocam /></MenuItem>
            <MenuItem onClick={null}><Call   /></MenuItem>
        </Menu>
      </div> 
  )
}

export default MenuIcon