import styled from "styled-components";
import { Outlet } from 'react-router-dom';

const HeaderWrapper = styled.header`
    position: relative;
    padding: 6px 0;
`;

const LogoImage = styled.img`
    display: block;
    margin: 0 auto;
    height: 36px;
    padding: 2px 6px;
`;

const InfoButton = styled.button`
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 2px;
    margin: 0;
    font-size: 0;
    background-color: unset;
    border: none;
    width: 40px;
    height: 40px;
    img {
        width: 36px;
        height: 36px;
    }
`;
const HeaderBox = () => {
    const OpenModal = () => {
        console.log('modal을 만들어주세욧!');
    };
    return (
        <>
            <HeaderWrapper className="header-wrapper">
                <h1 style={{display: 'none'}}>에잇꿀쟘</h1>
                <LogoImage src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt="eight-kkuljam-logo" />
                <InfoButton onClick={() => {OpenModal();}}>
                    <img src={`${process.env.PUBLIC_URL}/img/info.svg`} alt="ic-info" />
                </InfoButton>
            </HeaderWrapper>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default HeaderBox;