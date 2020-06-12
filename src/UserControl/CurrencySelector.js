import React, { useState, memo } from "react";
import styled from "styled-components";
import Style from "../Style";
import PropTypes from "prop-types";
import config from "../config";
import { useEffect } from "react";
import { useCallback } from "react";

const S = {};

const CurrencySelector = ({ currenciesLeft, onAdd }) => {
    const [value, setValue] = useState(currenciesLeft[0]);

    const handleAddClick = useCallback(() => {
        onAdd(value);
    }, [onAdd, value]);

    const handleSelectChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    useEffect(() => {
        setValue(currenciesLeft[0]);
    }, [currenciesLeft]);

    return (
        <S.CurrencySelector>
            <S.Select value={value} onChange={handleSelectChange}>
                {currenciesLeft.map((code) => {
                    return (
                        <option value={code} key={code}>
                            {code}
                        </option>
                    );
                })}
            </S.Select>
            <S.Add type="button" onClick={handleAddClick}>
                Add
            </S.Add>
        </S.CurrencySelector>
    );
};

CurrencySelector.propTypes = {
    currenciesLeft: PropTypes.arrayOf(
        PropTypes.oneOf(
            config.currencies.reduce((acc, item) => [...acc, item.code], [])
        )
    ).isRequired,
    onAdd: PropTypes.func.isRequired,
};

S.CurrencySelector = styled.div`
    display: flex;
`;

S.Select = styled.select`
    display: block;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 15px;
    font-size: 24px;
    flex-grow: 1;
    margin-right: 15px;
    color: #666;

    background: white;
    background-image: url("data:image/svg+xml;utf8,<svg fill='rgba(112,112,112,0.75)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: calc(100% - 5px);
    background-position-y: 17px;
    -webkit-appearance: none;
    -moz-appearance: none;

    &,
    &:focus {
        outline: 0;
        box-shadow: none;
    }
`;

S.Add = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 0;
    background: ${Style.btcColor};
    border-radius: 5px;
    color: white;
    font-size: 18px;
    padding: 0 40px;
    cursor: pointer;

    &,
    &:focus {
        outline: 0;
        box-shadow: none;
    }

    transition: opacity 0.25s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export default memo(CurrencySelector);
