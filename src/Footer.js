import React, { memo } from "react";
import styled from "styled-components";

const S = {};

const Footer = () => {
    return (
        <S.Footer>
            Created by
            <a
                href="https://github.com/epranka/btcoin-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                epranka
            </a>
        </S.Footer>
    );
};

S.Footer = styled.footer`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    display: flex;
    align-items: center;
    color: #666;
    background: #dadada;
    padding: 0 16px;
    font-size: 14px;

    a {
        margin-left: 5px;
        letter-spacing: 1px;
        text-decoration: underline;
        font-weight: bold;
        color: inherit;
    }
`;

export default memo(Footer);
