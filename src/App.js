import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import SideBar from './components/SideBar/SideBar';
import Pusher from 'pusher-js'
import io from 'socket.io-client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';
import Auth from './components/Auth/Auth';
import Contacts from './components/contacts/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET_IO_CONNECTION } from './redux/constants/actionType';

function App() {

  const [messages, setMessage] = useState([])
  const { user, socket } = useSelector((state) => state.AuthReducer)


  useEffect(() => {
    console.log(socket);
    socket.emit('join', { userId: user?._id, socketId: socket.id })
  }, [])

  return (


    <BrowserRouter>
      <Routes>
        <Route path='/' element={!user ? <Auth /> : <Home messages={messages} />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/users' element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
