import React, {useState,useEffect,useRef} from 'react';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import {allUsersRoute,host} from '../utils/APIRoutes';
import styled from 'styled-components'
import {io} from "socket.io-client";

import ChatContainer from '../components/ChatContainer';

export default function Chat() {
  
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts,setContacts] = useState([]);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async()=>{

    if(!localStorage.getItem("chat-app-users")){
        navigate("/login");
       }
       else{
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-users")));
            setIsLoaded(true);
       }    

    })();

  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    (async()=>{

    if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data); 
        }
        else{
          navigate("/setAvatar");
        }
       }
      
    })();

  }, [currentUser]);

  const handleChangechat = (chat)=>{
    setcurrentChat(chat);
  }

  return (
    <Container>
        <div className="container">
         <Contacts contacts = {contacts} currentUser = {currentUser} changeChat = {handleChangechat} />
         {isLoaded && currentChat === undefined ? (
          <Welcome  currentUser = {currentUser} />
         ) : (
          <ChatContainer currentChat={currentChat} currentUser = {currentUser} socket = {socket} />
         )}
        </div>
    </Container>

  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(138 0 0);
  .container {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 613px) and (max-width: 1080px) {
      grid-template-columns: 40% 60%;
    }
    
    @media screen and (min-width: 425px) and (max-width: 613px) {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`;