import React, { useCallback, memo } from "react";
import formatCurrency from "../formatCurrency";
import { media } from "../../Responsive";
import styled from "styled-components";
import PropTypes from "prop-types";
import config from "../../config";

const S = {};

const symbols = config.currencies.reduce(
    (acc, item) => ({ ...acc, [item.code]: item.symbol }),
    {}
);

const Currency = ({ code, value, onRemove, index }) => {
    const handleRemoveClick = useCallback(() => {
        onRemove(index);
    }, [index, onRemove]);

    return (
        <S.CurrencyContainer>
            <S.Currency>
                <S.CurrencyName>{code}</S.CurrencyName>
                <S.Value>
                    <span>{symbols[code]}</span>
                    {formatCurrency(value)}
                </S.Value>
            </S.Currency>
            <S.Remove onClick={handleRemoveClick}>&times;</S.Remove>
        </S.CurrencyContainer>
    );
};

Currency.propTypes = {
    index: PropTypes.number.isRequired,
    code: PropTypes.oneOf(
        config.currencies.reduce((acc, item) => [...acc, item.code], [])
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onRemove: PropTypes.func.isRequired,
};

S.CurrencyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    color: #666;
    background: white;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 15px;

    margin-bottom: 10px;
`;

S.Currency = styled.div`
    display: flex;
    flex-direction: column;

    ${media.min.sm`
        flex-direction: row;
        justify-content: space-between;
        flex-grow: 1;
    `}
`;

S.CurrencyName = styled.div`
    margin-bottom: 10px;

    ${media.min.sm`
        margin-bottom: 0;
    `}
`;

S.Value = styled.div`
    span {
        margin-right: 5px;
    }
`;

S.Remove = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    padding-left: 20px;
    font-size: 24px;
    color: #e2661b;
    cursor: pointer;

    transition: color 0.25s ease;

    &:hover {
        color: red;
    }
`;

export default memo(Currency);
