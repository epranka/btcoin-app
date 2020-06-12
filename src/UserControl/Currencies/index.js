import React, { memo } from "react";
import styled from "styled-components";
import Currency from "./Currency";
import PropTypes from "prop-types";
import config from "../../config";

const S = {};

const Currencies = ({ currencies, btcValue, rates, onRemove }) => {
    return (
        <S.Currencies>
            {currencies.map((code, index) => {
                const value = (
                    Math.round(btcValue * rates[code].rate_float * 100) / 100
                ).toFixed(2);
                return (
                    <Currency
                        key={code}
                        index={index}
                        code={code}
                        value={value}
                        onRemove={onRemove}
                    />
                );
            })}
        </S.Currencies>
    );
};

Currencies.propTypes = {
    currencies: PropTypes.arrayOf(
        PropTypes.oneOf(
            config.currencies.reduce((acc, item) => [...acc, item.code], [])
        )
    ).isRequired,
    btcValue: PropTypes.number.isRequired,
    rates: PropTypes.shape(
        config.currencies.reduce((acc, item) => {
            return {
                ...acc,
                [item.code]: PropTypes.shape({
                    rate_float: PropTypes.number.isRequired,
                }).isRequired,
            };
        }, {})
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
};

S.Currencies = styled.div``;

export default memo(Currencies);
