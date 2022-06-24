import { useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/home/Home';
import Auth from './components/Auth/Auth';
import Contacts from './components/contacts/contacts';
import {useSelector } from 'react-redux';
import VideoStreamSelf from './components/VideoChat/VideoStream';
import {ConfirmProvider} from 'material-ui-confirm'
import AudioChat from './components/AudioChat/AudioChat';
import Profile from './components/Profile/Profile';
import ContactInfo from './components/ContactInfo/ContactInfo';
function App() {
  const { AuthReducer,RoomReducer} = useSelector((state) => state);
  const{user, socket }=AuthReducer
  const{currentRoom}=RoomReducer

  useEffect(() => {
    console.log(socket);
    socket.emit('join', { userId: user?._id, socketId: socket.id })
    
  }, [])

  return (


    <BrowserRouter>
      <Routes>
        <Route path='/' element={!user ? <Auth /> : <ConfirmProvider><Home  /></ConfirmProvider>  } />
        <Route path='/auth' element={<Auth />} />
        <Route path='/users' element={<Contacts />} />
        <Route path='/videochat' element={!user ? <Auth/>:<VideoStreamSelf />}/>
        <Route path='/audiochat' element={!user?<Auth/>:<AudioChat/>}  />
        <Route path='/profile' element={!user ? <Auth/>:<Profile/>} />
        <Route path='/contactInfo' element={!user?<Auth/>:!currentRoom?<Home/>:<ContactInfo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
