import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from './styles'
import Peer from 'simple-peer'
import { useSelector } from 'react-redux'
import { Button, Grid, Paper } from '@material-ui/core'
import { CallEnd } from '@material-ui/icons'
import {useNavigate} from 'react-router-dom'
function VideoStream() {

    const myVideo = useRef()
    const friendVideo = useRef()
    const connectionRef = useRef()
    const navigate = useNavigate()
    const classes = useStyles()

    const [stream, setStream] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [passed, setPassed] = useState(false)

    const { AuthReducer, RoomReducer } = useSelector((state) => state)
    const { socket, callingUser, user, call } = AuthReducer
    const { currentRoom } = RoomReducer


    useEffect(() => {
        if (!passed) {
            console.log('time');
            navigator.mediaDevices.getUserMedia(({ video: true, audio: true })).then((myStream) => {
                setStream(myStream)

                myVideo.current.srcObject = myStream
                if (callingUser) {
                    callUser(myStream)
                } else {
                    answerCall(myStream)
                }


            })
            setPassed(true)
        }
    }, [callAccepted])



    async function callUser(myStream) {
        console.log('if working', myStream);
        const peer = new Peer({ initiator: true, trickle: false, stream: myStream })

        peer.on('signal', (data) => {
            console.log("if signal:", data);
            socket.emit('callUser', { userId: user._id, friendId: currentRoom._id, signalData: data })
        })
        peer.on('stream', (currentStream) => {
            console.log("if-stream :", currentStream);
            friendVideo.current.srcObject = currentStream
            console.log('friendvideo', friendVideo);
        })
        socket.on('answerCall', ({ signal }) => {
            setCallAccepted(true)
            console.log('call accepted working', signal);
            peer.signal(signal)

        })
        connectionRef.current = peer
    }


    async function answerCall(myStream) {
        setCallAccepted(true)
        console.log('else working', myStream);

        const peer = new Peer({ initiator: false, trickle: false, stream: myStream })
        peer.on('signal', (data) => {
            console.log('else signal  :', data);
            socket.emit('answerCall', { signal: data, to: call.from })
            console.log('call.signal: ', call.signal);
        })
        peer.on('stream', (currentStream) => {
            console.log("else stream :", currentStream);
            friendVideo.current.srcObject = currentStream
            console.log("fredn video", friendVideo);
        })
        peer.signal(call.signal)

        connectionRef.current = peer
    }

    console.log(connectionRef);


    const hangout = () => {
        connectionRef.current = null
        console.log('fff');
        socket.emit('hangUp', { friendId: currentRoom?._id || call?.from, })
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
        navigate('/')

    }

    useEffect(() => {
        socket.on('hangUp', () => {
            console.log('hangup');
            connectionRef.current = null
            if (stream) {
                console.log(stream);
                stream.getTracks()?.forEach(function (track) {
                    track.stop();
                    navigate('/')
                });
            } else {
                myVideo.current = null
                friendVideo.current = null
                navigator.mediaDevices.getUserMedia({ video: false, audio: false })
                navigate('/')
            }
        })

        return () => {
            socket.off('hangUp')
        }
    }, [])


    return (
        <div className="App">
            <div className="App_body"  >
                <Paper className={classes.paper} >


                    {callAccepted && (
                        <Grid item xs={12} className={classes.grid} >
                            <video ref={friendVideo} autoPlay playsInline className={classes.friendVideo} />
                        </Grid>
                    )}
                    <div  >
                        <video ref={myVideo} autoPlay muted playsInline className={classes.myVideo} />
                    </div>
                    <div style={{ alignContent: 'center', marginLeft: '45%', }}>
                        <div style={{ display: 'flex' }}>
                            <Button onClick={hangout}>
                                <CallEnd className={classes.icon} sx={{ fontSize: 40 }} />
                            </Button>
                        </div>


                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default VideoStream