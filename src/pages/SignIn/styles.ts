import styled, { keyframes } from 'styled-components'; 
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png'; 

export const Container = styled.div`
    height: 100vh;
    display: flex; 
    align-items: stretch; 
`;

export const Content = styled.section`
    display: flex; 
    flex-direction: column;
    align-items: center;  
    justify-content: center; 

    width: 100%;
    max-width: 700px; 
`;

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px); 
    }
    to {
        opacity: 1;
        transform: translateX(0); 
    }
`;

export const AnimationContainer = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;  
    justify-content: center; 

    animation: ${appearFromLeft} 1s; 

    form {
        margin: 80px 0;
        width: 340px; 
        text-align: center;  

        h1 {
            margin-bottom: 24px; 
        }

        a {
            color: #A0A0B2; 
            display: block; 
            margin-top: 24px; 
            text-decoration: none;
            transition: color 0.2s; 

            &:hover{ 
                color: ${shade(0.2, '#A0A0B2')}
            } 
        }
    }

    > a {

        color: #6C63FF; 
        display: block; 
        margin-top: 24px; 
        text-decoration: none;
        transition: color 0.2s; 

        display: flex; 
        align-items: center;

        svg {
            margin-right: 16px; 
        }

        &:hover{ 
            color: ${shade(0.2, '#6C63FF')}
        } 

    }
`;

export const Background = styled.section`
    flex: 1;
    background: url(${signInBackgroundImg}) no-repeat center; 
    background-size: contain; 
`;