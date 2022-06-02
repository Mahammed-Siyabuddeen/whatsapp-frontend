import { Button, Dialog, } from '@material-ui/core'
import { Close} from '@material-ui/icons'
import React from 'react'
import {useStyles} from './styles'
function ImageView({popup,setPopup,currentImage,name}) {
   const classes=useStyles()
    return (
      <div>
          <Dialog open={popup}>
          <Button  className={classes.button} onClick={()=>setPopup(false)}>
              <Close />
          </Button>
            <img src={currentImage} alt={name||'image'} />
          </Dialog>
      </div>
  )
}

export default ImageView