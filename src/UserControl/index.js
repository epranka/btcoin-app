import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import config from "../config";
import Fetcher from "./Fetcher";
import BTCInput from "./BTCInput";
import Currencies from "./Currencies";
import CurrencySelector from "./CurrencySelector";
import { useMemo } from "react";

const S = {};

const possibleCurrenciesCodes = config.currencies.reduce(
    (acc, item) => [...acc, item.code],
    []
);

const UserControl = () => {
    const [rates, setRates] = useState(null);
    const [btcValue, setBtcValue] = useState();
    const [currenciesCodes, setCurrenciesCodes] = useState([]);

    const handleBtcChange = useCallback((btcValue) => {
        setBtcValue(btcValue);
    }, []);

    const handleRatesReceive = useCallback((rates) => {
        if (rates) setRates(rates.bpi);
    }, []);

    const handleCurrencyRemove = useCallback(
        (indexToRemove) => {
            currenciesCodes.splice(indexToRemove, 1);
            setCurrenciesCodes([...currenciesCodes]);
        },
        [currenciesCodes]
    );

    const handleAddCurrency = useCallback(
        (codeToAdd) => {
            setCurrenciesCodes([...currenciesCodes, codeToAdd]);
        },
        [currenciesCodes]
    );

    const currenciesLeft = useMemo(
        () =>
            possibleCurrenciesCodes.filter(
                (code) => !currenciesCodes.includes(code)
            ),
        [currenciesCodes]
    );

    return (
        <S.UserControl>
            <Fetcher onData={handleRatesReceive} />
            <BTCInput onChange={handleBtcChange} />
            {rates ? (
                <>
                    <Currencies
                        currencies={currenciesCodes}
                        btcValue={btcValue}
                        rates={rates}
                        onRemove={handleCurrencyRemove}
                    />
                    {currenciesLeft.length ? (
                        <CurrencySelector
                            currenciesLeft={currenciesLeft}
                            onAdd={handleAddCurrency}
                        />
                    ) : null}
                </>
            ) : null}
        </S.UserControl>
    );
};

S.UserControl = styled.main`
    position: relative;
    min-height: 400px;
`;

export default memo(UserControl);
