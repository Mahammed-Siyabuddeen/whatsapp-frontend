import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';
import Auth from './components/Auth/Auth';
import Contacts from './components/contacts/contacts';
import { useDispatch, useSelector } from 'react-redux';
import VideoStreamSelf from './components/VideoChat/VideoStream';
import { ConfirmProvider } from 'material-ui-confirm'
import AudioChat from './components/AudioChat/AudioChat';
import Profile from './components/Profile/Profile';
import ContactInfo from './components/ContactInfo/ContactInfo';
import { LOGOUT, UPDATE_STATUS } from './redux/constants/actionType';
import decode from 'jwt-decode'
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
function App() {
  const { AuthReducer, RoomReducer } = useSelector((state) => state);
  const { user, socket } = AuthReducer
  const { currentRoom } = RoomReducer
  const dispatch = useDispatch()

  const theme = createTheme({
    // Add your MUI theme configuration here if needed
  });
  useEffect(() => {
    console.log(socket);
    socket.emit('join', { userId: user?._id, socketId: socket.id })

  }, [])
  useEffect(() => {
    if (user?.token) {
      const decodeToken = decode(user?.token)
      if (decodeToken?.exp * 1000 < new Date().getTime())
        dispatch({ type: LOGOUT })
    }
  }, [user])
  useEffect(() => {
    socket.on('status', ({ _id, status }) => {
      dispatch({ type: UPDATE_STATUS, payload: { status, _id } })
      console.log('socket on status : ', _id);
    })
    return () => {
      socket.off('status')
    }
  }, [])

  return (


    <BrowserRouter>
      <Routes>
        <Route path='/' element={!user ? <Auth /> :
          <ThemeProvider theme={theme}>
            <ConfirmProvider><Home /></ConfirmProvider>
          </ThemeProvider>
        } />
        <Route path='/auth' element={<Auth />} />
        <Route path='/users' element={<Contacts />} />
        <Route path='/videochat' element={!user ? <Auth /> : <VideoStreamSelf />} />
        <Route path='/audiochat' element={!user ? <Auth /> : <AudioChat />} />
        <Route path='/profile' element={!user ? <Auth /> : <Profile />} />
        <Route path='/contactInfo' element={!user ? <Auth /> : !currentRoom ? <Home /> : <ContactInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
