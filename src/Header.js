import React, { memo } from "react";
import styled from "styled-components";
import Style from "./Style";
import { media } from "./Responsive";

const S = {};

const Header = () => {
    return (
        <S.Header>
            <S.Background />
            <S.CenterContainer>
                <S.Circle>
                    <img src="/bitcoin.png" alt="bitcoin logo" />
                </S.Circle>
                <S.TitleContainer>
                    <S.Title>BitCoin Rate</S.Title>
                </S.TitleContainer>
            </S.CenterContainer>
        </S.Header>
    );
};

S.Header = styled.header`
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    ${media.min.sm`
        margin-bottom: 50px;
    `}
`;

S.Background = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 60vh;
    background: linear-gradient(
        170deg,
        ${Style.btcColor} 49.8%,
        ${Style.backgroundColor} 50%
    );
`;

S.CenterContainer = styled.div`
    margin-top: 25vh;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

S.Circle = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: ${Style.backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        display: block;
        max-width: 140px;
    }
`;

S.TitleContainer = styled.div``;

S.Title = styled.h1``;

export default memo(Header);
