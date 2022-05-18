import React from 'react'
import SideBar from '../SideBar/SideBar'
import Chat from '../Chat/Chat'
function Home({messages,user}) {
  return (
    <div className="App">
    <div className="App_body">
     <>
         <SideBar user={user}/>
         <Chat messages={messages} />
     </>
    </div>
 </div>
  )
}

export default Home