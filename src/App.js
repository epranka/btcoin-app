import React, { memo } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import { breakpoints, media } from "./Responsive";
import Style from "./Style";
import UserControl from "./UserControl";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
    color: ${Style.textColor};
    background: ${Style.backgroundColor};
  }
`;

const S = {};

const App = () => {
    return (
        <>
            <S.App>
                <S.Wrapper>
                    <Header />
                    <S.Container>
                        <UserControl />
                    </S.Container>
                </S.Wrapper>
                <Footer />
            </S.App>
            <GlobalStyle />
        </>
    );
};

S.App = styled.div`
    min-height: 100vh;
    position: relative;
`;

S.Wrapper = styled.div`
    padding-bottom: 250px;
`;

S.Container = styled.div`
    margin: 0 auto;
    padding-left: 16px;
    padding-right: 16px;

    ${media.min.sm`
      max-width: ${breakpoints.sm}px;
    `}
`;

export default memo(App);
