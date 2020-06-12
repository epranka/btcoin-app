import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import config from "../config";
import PropTypes from "prop-types";

const S = {};

const updateInterval = config.updateInterval;

const Fetcher = ({ onData }) => {
    const [timeLeft, setTimeLeft] = useState(updateInterval);
    const timeLeftRef = useRef(updateInterval);

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRates = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(config.apiUrl);
            const json = await res.json();
            setResponse(json);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.error(err);
            setError("Can't fetch the rates data");
        }
    }, []);

    useEffect(() => {
        fetchRates();
    }, [fetchRates]);

    useEffect(() => {
        let interval = setInterval(async () => {
            if (timeLeftRef.current > 0) {
                timeLeftRef.current -= 1000;
                setTimeLeft(timeLeftRef.current);
            } else {
                await fetchRates();
                timeLeftRef.current = updateInterval;
                setTimeLeft(updateInterval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [fetchRates]);

    useEffect(() => {
        onData(response);
    }, [response, onData]);

    return (
        <S.Fetcher>
            {error ? <span className="error">{error}</span> : null}
            {isLoading ? (
                <span>Updating...</span>
            ) : (
                <span>Updating in {Math.trunc(timeLeft / 1000)} s...</span>
            )}
        </S.Fetcher>
    );
};

Fetcher.propTypes = {
    onData: PropTypes.func.isRequired,
};

S.Fetcher = styled.div`
    position: relative;
    text-align: center;
    margin-bottom: 30px;
    color: #666;
    letter-spacing: 1px;

    span {
        display: block;
    }

    .error {
        color: red;
        margin-bottom: 5px;
    }
`;

export default memo(Fetcher);
