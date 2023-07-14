import React from 'react';
import styled from 'styled-components';
import Robot from "../assets/robot.gif";

export default function Welcome({currentUser}) {

    return(
        <Container>
            <img src= {Robot} alt="Robot" />
            <div className="main"><br />
            <h1>Welcome, <span>{currentUser.username}😎</span></h1>
            <h3>Please select a chat to start Messaging..👀</h3>
            </div>
            
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: rgb(186, 199, 3);
  }
  .main{
    text-align: center;
  }

  @media screen and (min-width: 375px) and (max-width: 770px) {
       .main{
         h1{
          font-size: 20px;
         }

         h3{
          font-size: 15px;
         }
       }
    }

    @media screen and (min-width: 320px) and (max-width: 375px) {
       .main{
         h1{
          font-size: 17px;
         }

         h3{
          font-size: 13px;
         }
       }
    }

  @media screen and (min-width: 500px) and (max-width: 613px) {
       .main{
         h1{
          font-size: 20px;
         }
         h3{
          font-size: 12px;
         }
       }
    }

    @media screen and (min-width: 425px) and (max-width: 613px) {

      display: none;
      
    }
`;
