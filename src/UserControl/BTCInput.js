import React, { useState, useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import formatCurrency from "./formatCurrency";
import config from "../config";

const S = {};

const BTCInput = ({ onChange }) => {
    const [btcValue, setBtcValue] = useState(config.defaultBtcValue.toString());

    const handleInputChange = useCallback((e) => {
        const value = formatCurrency(e.target.value || "");
        setBtcValue(value);
    }, []);

    useEffect(() => {
        const btcValueFloat = parseFloat(btcValue.replace(/\s+/g, ""));
        onChange(isNaN(btcValueFloat) ? 0 : btcValueFloat);
    }, [btcValue, onChange]);

    return (
        <S.BTCInput>
            <S.Label htmlFor="btcInput">Enter amount</S.Label>
            <S.Input>
                <span>BTC</span>
                <input
                    id="btcInput"
                    type="text"
                    value={btcValue}
                    onChange={handleInputChange}
                />
            </S.Input>
        </S.BTCInput>
    );
};

BTCInput.propTypes = {
    onChange: PropTypes.func.isRequired,
};

S.BTCInput = styled.div`
    margin-bottom: 30px;
`;

S.Label = styled.label`
    display: block;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 10px;
`;

S.Input = styled.div`
    display: flex;

    span {
        font-size: 24px;
        padding: 0 15px 0 15px;
        background: white;
        color: #666;
        border: 2px solid #ccc;
        border-radius: 5px 0 0 5px;
        border-right: 0;
        line-height: 2;
    }

    input {
        padding: 0;
        display: block;
        border: 2px solid #ccc;
        border-left: 0;
        border-radius: 0 5px 5px 0;
        font-weight: bold;
        color: #666;
        font-size: 24px;
        width: 100%;
        line-height: 2;

        &,
        &:focus {
            outline: 0;
            box-shadow: none;
        }
    }
`;

export default memo(BTCInput);
