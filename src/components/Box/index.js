import styled from 'styled-components';

const Box = styled.div `
    background: #ffffff;
    border-radius: 8px;

    margin-bottom: 10px;
    padding: 16px;

    .boxLink {
        font-size: 14px;
        color: #2e7bb4;
        text-decoration: none;
        font-weight: 800;
    }

    .title {
        font-size: 32px;
        font-weight: 400;
        margin-bottom: 20px;
    }

    .subTitle {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
    }

    .smallTitle{
        color: #333333;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 20px;
    }


    hr {
        border-color: transparent;
        border-bottom-color: #ecf2fa;
        margin-top: 12px;
        margin-bottom: 8px;
    }


    input {
        background-color: #f4f4f4;
        border-radius: 10000px;
        border: 0;
        color: #333333;
        margin-bottom: 14px;
        padding: 14px 16px;
        width: 100%;
        ::placeholder{
            color: #333333;
            opacity: 1;
        }
    }


    button {
        background-color: #6f92bb;
        border: 0;
        border-radius: 10000px;
        color: #ffffff;
        padding: 8px 12px;

    }
`;

export default Box;