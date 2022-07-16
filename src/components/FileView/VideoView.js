import { Button, Dialog } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fecthVideoFile } from '../../redux/actions/Rooms'
import { REMOVE_CURRENT_VIDEOFILE } from '../../redux/constants/actionType'
import {useStyles}  from './styles'
function VideoView({videoPopup,setVideoPopup,currentVideoDetails}) {
  let {videoFile,_id}=currentVideoDetails
  let {currentVideo}=useSelector(state=>state.RoomReducer)
  const classes=useStyles()
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!videoFile && videoPopup!=false) dispatch(fecthVideoFile(_id))
    if(videoPopup==false && currentVideo) dispatch({type:REMOVE_CURRENT_VIDEOFILE})
  },[videoPopup])
  console.log("currentVideo : ",currentVideo);
  return (
      <Dialog open={videoPopup} fullWidth>
      <Button className={classes.button} onClick={()=>setVideoPopup(false)}>
        <Close/>
      </Button>
      <video controls autoPlay>
          <source src={videoFile}></source>
         {currentVideo&& <source src={currentVideo}></source>}
         video not available
      </video>
    </Dialog>
  )
}

export default VideoView