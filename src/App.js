import { useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/home/Home';
import Auth from './components/Auth/Auth';
import Contacts from './components/contacts/contacts';
import {useSelector } from 'react-redux';
import VideoStreamSelf from './components/VideoChat/VideoStream';
import {ConfirmProvider} from 'material-ui-confirm'
function App() {
  const { user, socket } = useSelector((state) => state.AuthReducer)

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
