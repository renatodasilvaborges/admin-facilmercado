import styled from 'styled-components'; 
import { lighten } from 'polished'; 

export const Container = styled.div`
> header {
    height: 144px;
    background: #EFEEFF;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    
      svg {
        color: #999591;
        transition: color 0.3s;
      }
    
      a:hover {
        svg {
          color: ${lighten(0.2, '#999591')};
        }
      }
    }
  }
`;


export const Header = styled.header`
    padding: 32px 0;
    background: #EFEEFF;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto; 
    display: flex; 
    align-items: center; 

    > img {
        height: 35px; 
    }

    button {
        margin-left: auto; 
        background: transparent; 
        border: 0; 

        svg {
            color: #999591;
            width: 20px;
            height: 20px; 
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center; 
    margin-left: 80px;

    img {
        width: 56px; 
        height: 56px;
        border-radius: 50%; 
    }

    div {
        display: flex; 
        flex-direction: column; 
        margin-left: 16px; 
        line-height: 24px;

        span {
            color: #999591;
        }

        a {
            text-decoration: underline;
            color: #6C63FF; 

            &:hover{
                opacity: 0.8;
            }
        }
    }
`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex; 

`;

export const List = styled.div`
    flex: 1; 
    margin-right: 120px; 

    h1 {
        font-size: 36px;
    }

    p {
        margin-top: 8px;
        color:  #6C63FF;
        display: flex; 
        align-items: center; 
        font-weight: 500; 

        span {
            display: flex;
            align-items: center; 
        } 

        span + span::before {
            content: '';
            width: 1px;
            height: 12px;
            background: #6C63FF;  
            margin: 0 8px; 
        }
    }
`;

export const Section = styled.aside`
    margin-top: 48px;
    
    > a {
        text-decoration: none; 
    }

    > div {
        margin-top: 16px; 
    }

    > strong {
        color: #e4e2ff;
        font-size: 20px;
        line-height: 26px;
        border-bottom: 1px solid #EFEEFF; 
        display: block; 
        padding-bottom: 16px;
        margin-bottom: 16px; 
    } 

    > p {
        color: #efeefb;
    }
`;

export const Product = styled.div`
    display: flex;
    align-items: center; 
    margin-top: 16px; 

    span {
        
        margin-left: auto;
        display: flex;
        align-items: center; 
        color: #999591; 
        width: 70px;

        svg {
            color: #6C63FF;
            margin-right: 8px;
        }
    }

    div {
        flex: 1; 
        background: #FFF; 
        display: flex;
        align-items: center; 
        padding: 19px 24px; 
        border-radius: 10px;
        margin-left: 24px;
        border: 1px solid #EFEEFF;  


        img {
            width: 56px;
            height: 56px; 
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #6C6C80;
            font-size: 20px; 
            font-weight: 500; 

        }

        &:hover{
                opacity: 0.8;
                background: #f8f7ff; 
                cursor: pointer; 
                
        }
    }
`;


export const SectionButton = styled.aside`
    width: 380px; 
`;


