import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Logo from "../assets/logo.svg";


export default function Contacts({contacts,currentUser,changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage,setCurrentUserImage] = useState(undefined);
    const [currentSelected,setCurrentSelected] = useState(undefined);
    useEffect(() => {
        (async()=>{
           console.log(contacts);
        if(currentUser){
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
           }

        })();
    
      }, [currentUser]);

      const changeCurrentChat = (index,contact) =>{
        setCurrentSelected(index);
        changeChat(contact);
      }
    
      return (
        <>
          {currentUserImage && currentUserName && (
            <Container>
              <div className="brand">
                <img src={Logo} alt="logo" />
                <h3>I-Chatter</h3>
              </div>
              <div className="contacts">

                {contacts.map((contact, index) => {
                  return (
                    <div
                      key={contact._id}
                      className={`contact ${
                        index === currentSelected ? "selected" : ""
                      }`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt=""
                        />
                      </div>
                      <div className="username">
                        <h4>{contact.username}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="current-user">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
              </div>
            </Container>
          )}
        </>
      );
  
    
   
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: black;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3rem;
      cursor: pointer;
      width: 98%;
      border-radius: 5rem;
      padding: 0.1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h4 {
          color: #bac703;
        }
      }
    }
    .selected {
      background-color: #18055d;
    }
  }

  .current-user {
    background-color: #a610b6;
    border: 5px solid black;
    border-radius: 3rem;
    display: flex;
    /* margin-left: -10px; */
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: #faa3a3;
        font-weight: bold;
      }
    }

    @media screen and (min-width: 500px) and (max-width: 1270px) {
      gap: 1rem;
      .username {
        h2 {
          font-size: 2rem;
        }
      }
      .avatar {
      img {
        height: 3rem;
      }
    }
    }

  }

`;


